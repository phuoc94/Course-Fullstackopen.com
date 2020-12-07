import React from 'react'

const Person = ({ person, handler }) => {

    return (
        <li>
            {person.name} {person.number}
            <button onClick={handler}>Delete</button>
        </li>
    )
}

export default Person