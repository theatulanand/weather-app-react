import React from 'react'
import Chart from 'react-apexcharts'
import axios from 'axios'
import { useSelector } from 'react-redux'

export const DetailedView = () => {
    const [options, setOptions] = React.useState({
        chart: {
            id: 'apexchart'
        },
        xaxis: {
            categories: []
        }
    })

    const [series, setSeries] = React.useState([
        {
            name: 'Temperature',
            data: []
        }
    ])

    const [curWeather, setCurWeather] = React.useState({})

    let city = useSelector(store => store.city.value);

    React.useEffect(() => {

        const axiosOptions = {
            method: 'GET',
            url: 'https://api.openweathermap.org/data/2.5/weather',
            params: { q: city, units: 'metric', appid: 'c532e56f877ab8a2225c8c03305290f7' }
        };

        axios.request(axiosOptions).then(function (res) {
            console.log(res.data);

            setCurWeather({
                temp: res.data.main.temp,
                desc: res.data.weather[0].main,
                pressure: res.data.main.pressure,
                humidity: res.data.main.humidity,
                sunrise: 6,
                sunset: 5
            })
            axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${res.data.coord.lat}&lon=${res.data.coord.lon}&exclude=daily,minutely,current,alerts&units=metric&appid=c532e56f877ab8a2225c8c03305290f7`).then((res) => {

                let temp = [];
                let time = [];
                //console.log(res.data)

                for (let i = 0; i < 24; i++) {
                    temp.push(res.data.hourly[i].temp);
                    let date = new Date(res.data.hourly[i].dt * 1000 - (res.data.timezone_offset * 1000)).toString().split(" ")[4].split(":")[0]
                    time.push(date);
                }

                //console.log(temp)
                setSeries([
                    {
                        name: 'Temperature',
                        data: temp
                    }
                ]);

                setOptions({
                    chart: {
                        id: 'apexchart'
                    },
                    xaxis: {
                        categories: time
                    },
                    yaxis: {
                        show: false
                    },
                    dataLabels: {
                        enabled: false
                    },
                    tooltip: {
                        y: {
                            formatter: (el) => el + " °C"
                        }
                    }
                })
            }).catch((err) => {
                console.log(err)
            })
        }).catch(function (error) {
            console.error(error);
        });
    }, [city]);

    return (
        <div style={{ width: "90%", margin: "auto", padding: "10px", marginTop: "10px", borderRadius: "5px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
            <h1 style={{ fontSize: "50px" }}>{curWeather.temp + "°C"} <span><img style={{ width: "50px" }} src={curWeather.desc === "Mist" || curWeather.desc === "Smoke" || curWeather.desc === "Clouds" || curWeather.desc === "Fog" ? "https://weatherapp-swanand.netlify.app/img/cloudy.ac49ed24.svg" : "https://weatherapp-swanand.netlify.app/img/sunny.ef428e2d.svg"} alt="" /></span></h1>


            <Chart options={options} series={series} type="area" height={300} />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className='extraDetails'>
                    <div style={{ fontWeight: "bold" }}>Pressure</div>
                    <div>{curWeather.pressure + " hpa"}</div>
                </div>
                <div className='extraDetails'>
                    <div style={{ fontWeight: "bold" }}>Humidity</div>
                    <div>{curWeather.humidity + " %"}</div>
                </div>
            </div><br />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className='extraDetails'>
                    <div style={{ fontWeight: "bold" }}>Sunrise</div>
                    <div>{curWeather.sunrise + ":00 AM"}</div>
                </div>
                <div className='extraDetails'>
                    <div style={{ fontWeight: "bold" }}>Sunset</div>
                    <div>{curWeather.sunset + ":00 PM"}</div>
                </div>
            </div>
        </div>

    )
}
