import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export const DaysReport = () => {
    const [data, setData] = useState(null)
    let city = useSelector(store => store.city.value);

    useEffect(() => {
        const axiosOptions = {
            method: 'GET',
            url: 'https://api.openweathermap.org/data/2.5/weather',
            params: { q: city, units: 'metric', appid: 'c532e56f877ab8a2225c8c03305290f7' }
        };

        axios.request(axiosOptions).then(function (res) {
            console.log(res.data);
            axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${res.data.coord.lat}&lon=${res.data.coord.lon}&exclude=minutely,current,alerts&units=metric&appid=c532e56f877ab8a2225c8c03305290f7`).then((res) => {
                console.log(res.data);
                let arr = [];
                res.data.daily.forEach((el) => {
                    let date = new Date(el.dt * 1000 - (res.data.timezone_offset * 1000)).toString().split(" ")[0]
                    let obj = {
                        time: date,
                        maxTmp: el.temp.max,
                        minTmp: el.temp.min,
                        desc: el.weather[0].main
                    }

                    arr.push(obj)
                })

                setData(arr)
            }).catch((err) => {
                console.log(err);
            })
        })
    }, [city])

    return (
        <div id="day">
            {data ?
                data.map((el) => (
                    <div>
                        <div>{el.time}</div>
                        <div style={{ height: "50px" }}>{el.maxTmp + "°, " + el.minTmp + "°"}</div>
                        <div><img style={{ width: "50px", margin: "auto" }} src={el.desc === "Mist" || el.desc === "Smoke" || el.desc === "Clouds" || el.desc === "Fog" ? "https://weatherapp-swanand.netlify.app/img/cloudy.ac49ed24.svg" : "https://weatherapp-swanand.netlify.app/img/sunny.ef428e2d.svg"} alt="" /></div>
                        <div>{el.desc}</div>
                    </div>
                )) : ""
            }
        </div>
    )
}
