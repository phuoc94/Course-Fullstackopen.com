import React from 'react'

const Dcountries = ({ data, filter, showHandler }) => {
    const filtered = data.filter(country =>
        country.name.toLowerCase().includes(filter.toLowerCase())
    )
    const finded = filtered.length;

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