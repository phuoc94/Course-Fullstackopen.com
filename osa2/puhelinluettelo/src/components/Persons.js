import React from 'react';
import Person from './Person'


const Persons = ({ persons, filter }) => {
    const filtered = persons.filter(person =>
        person.name.includes(filter)
    )
    return (
        <div>
            <ul>
                {filtered.map(person =>
                    <Person key={person.id} person={person} />
                )}
            </ul>
        </div>
    )
}
export default Persons