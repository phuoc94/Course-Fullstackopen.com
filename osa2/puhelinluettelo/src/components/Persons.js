import React from 'react';
import Person from './Person'


const Persons = ({ persons, filter, handler }) => {
    const filtered = persons.filter(person =>
        person.name.includes(filter)
    )
    //console.log(filtered)
    //console.log(handler)
    return (
        <div>
            <ul>
                {filtered.map(person =>
                    <Person key={person.id} person={person} handler={() => handler(person.id)} />
                )}

            </ul>
        </div>
    )
}
export default Persons