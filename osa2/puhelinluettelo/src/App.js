import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'



const App = () => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setFilter] = useState('')
    const [persons, setPersons] = useState([])

    const hook = () => {
        console.log('effect')
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled')
                setPersons(response.data)
            })
    }

    useEffect(hook, [])


    const addNewName = (event) => {
        event.preventDefault()
        const isPersonIn = persons.find(person => person.name === newName)

        if (!isPersonIn) {
            const person = {
                name: newName,
                number: newNumber
            }

            setPersons(persons.concat(person))
            setNewName('')
            setNewNumber('')
        } else {
            alert(`${newName} is already added to phonebook`)
        }
    }

    const handleNewNameChange = (event) => {
        setNewName(event.target.value)
    }
    const handleNewNumberChange = (event) => {
        setNewNumber(event.target.value)
    }
    const handleFilter = (event) => {
        setFilter(event.target.value)
    }
    const formControl = {
        state: {
            newName: newName,
            newNumber: newNumber
        },
        handlers: {
            handleNewNameChange: handleNewNameChange,
            handleNewNumberChange: handleNewNumberChange
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>

            <Filter newFilter={newFilter} handleFilter={handleFilter} />

            <h3>Add a new</h3>

            <PersonForm
                data={formControl}
                addNewName={addNewName}
            />

            <h3>Numbers</h3>

            <Persons persons={persons} filter={newFilter} />
        </div>
    )

}

export default App