import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from './Weather'

const Dcountries = ({ data, filter, showHandler }) => {
    const [weather, setWeather] = useState([])

    const filtered = data.filter(country =>
        country.name.toLowerCase().includes(filter.toLowerCase())
    )
    const finded = filtered.length;

    const hook = () => {
        if (finded === 1) {
            const apikey = process.env.REACT_APP_API_KEY
            const options = {
                method: 'GET',
                url: 'http://api.weatherbit.io/v2.0/current',
                params: { lat: `${filtered[0].latlng[0]}`, lon: `${filtered[0].latlng[1]}`, key: `${apikey}` },
            };

            axios.request(options).then(function (response) {
                //console.log(response.data);
                setWeather(response.data.data)
            }).catch(function (error) {
                console.error(error);
            });

        }
    }
    // eslint-disable-next-line
    useEffect(hook, [finded])


    if (finded === 1) {
        return (
            <div>
                <h1>{filtered[0].name}</h1>
                <p>capital {filtered[0].capital}</p>
                <p>populaton {filtered[0].population}</p>
                <h2>languages</h2>
                <ul>
                    {filtered[0].languages.map(lan =>
                        <li key={lan.name} >{lan.name}</li>
                    )}
                </ul>

                <img src={filtered[0].flag} height="100" alt="flag" />
                <Weather data={weather} />
            </div>
        )
    } else if (finded === 0) {
        return (
            <div>coutrires not found</div>
        )
    }
    else if (finded <= 10) {
        return (
            <div>
                <ul>
                    {filtered.map(contry =>
                        <li key={contry.numericCode}>{contry.name} <button id={contry.name} onClick={showHandler} >show</button></li>
                    )}
                </ul>
            </div>
        )
    } else {
        return (
            <div>To many matches, specify another filter</div>
        )
    }
}

export default Dcountries