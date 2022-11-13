import { Icon, Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { ImLocation } from 'react-icons/im'
import React, { useState } from 'react'
import axios from 'axios';
import cities from '../Assets/cities.json'
import { useDispatch } from 'react-redux';
import { ChangeCity } from '../Redux/actions';


export const Search = () => {
    const [status, setStatus] = useState(null);
    const [city, setCity] = React.useState("");
    const [cityData, setCityData] = useState([]);
    const [timerId, setTimerId] = useState(null);
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch()

    const handleSearch = () => {
        setVisible(false)
        findCity()
    }


    const handleChange = (e) => {
        setCity(e.target.value)
        setVisible(true)
        if (timerId) (
            clearTimeout(timerId)
        )

        let x = setTimeout(function () {
            findCity();
        }, 1000)

        setTimerId(x)
    }

    const findCity = () => {
        let data = (cities.filter(cities => cities.name.includes(city)))
        setCityData(data);
        dispatch(ChangeCity(city))
    }

    const getCity = () => {

        if (!navigator.geolocation) {
            setStatus('Geolocation is not supported by your browser');
        } else {
            setStatus('Locating...');
            navigator.geolocation.getCurrentPosition((position) => {
                setStatus(null);
                axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=1&appid=${"c532e56f877ab8a2225c8c03305290f7"}`).then((res) => {
                    console.log(res.data);
                    setCity(res.data[0].name + ", " + res.data[0].state);
                    dispatch(ChangeCity(res.data[0].name))
                }).catch((err) => {
                    console.log(err)
                    console.log(status)
                })
            }, () => {
                setStatus('Unable to retrieve your location');
            });
        }
    }

    const handleClick = (i) => {
        setVisible(false)
        setCity(cityData[i].name);
        dispatch(ChangeCity(city))
    }


    React.useEffect(() => {
        getCity()
    }, [])
    return (
        <>

            <InputGroup width={'90%'} margin={"auto"}>
                <InputRightElement
                    pointerEvents=''
                    onClick={() => { handleSearch() }}
                    children={<SearchIcon fontSize={"20px"} color='black' />}
                />
                <InputLeftElement
                    pointerEvents=''
                    children={<Icon fontSize={"20px"} as={ImLocation} />}
                />
                <Input fontWeight={"bold"} boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"} value={city} onChange={(e) => { handleChange(e) }} variant='outline' size='lg' />
            </InputGroup>

            <div id='cities'>
                {visible ?
                    cityData.map((el, i) => {
                        return <>
                            <h1 onClick={() => handleClick(i)} style={{ padding: "18px" }} key={el.id}>{el.name + ", " + el.state}</h1>
                            <hr />
                        </>
                    }) : ""
                }
            </div>
        </>
    )
}
