import React from 'react'

const Weather = ({ data }) => {
    const weather = data[0]
    //console.log(weather)
    if (data.length === 1) {
        const icon = `https://www.weatherbit.io/static/img/icons/${weather.weather.icon}.png`
        const weatheralt = weather.weather.description

        return (
            <div>
                <p><b>temperature: </b> {weather.temp} Celcius</p>
                <img src={icon} alt={weatheralt} />
                <p><b>wind:</b> {weather.wind_spd} m/s direction {weather.wind_cdir}</p>
            </div>)
    } else {
        return (
            <div>
                weather cant load
            </div>)
    }
}


export default Weather