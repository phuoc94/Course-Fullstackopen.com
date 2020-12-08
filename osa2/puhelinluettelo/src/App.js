import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personsService from './services/persons'
import Notification from './components/Notification'



const App = () => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setFilter] = useState('')
    const [persons, setPersons] = useState([])
    const [errorMessage, setErrorMessage] = useState([])

    const hook = () => {
        //console.log('effect')
        personsService
            .getAll()
            .then(initialPersons => {
                //console.log('promise fulfilled')
                //console.log(initialPersons)
                setPersons(initialPersons)
            }).catch(error => {
                notiHandler(
                    `cannot load from server`, 'error'
                )
            })
    }
    useEffect(hook, [])

    const notiHandler = (message, type) => {
        setErrorMessage(
            [message, type]
        )
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
    }

    const deleteHandler = (id) => {
        const sPersons = persons.filter(p => p.id === id)
        const result = window.confirm(`Delete ${sPersons[0].name} ?`);
        if (result) {
            personsService
                .del(id)
                .then(status => {
                    //console.log('deleted', status)
                    notiHandler(
                        `deleted ${sPersons[0].name}`, 'success'
                    )
                    setPersons(persons.filter(p => p.id !== id))

                })
                .catch(error => {
                    notiHandler(
                        `cannot delete ${sPersons[0].name}`, 'error'
                    )
                })
        }
    }

    const addNewName = (event) => {
        event.preventDefault()
        const isPersonIn = persons.find(person => person.name === newName)
        const person = {
            name: newName,
            number: newNumber
        }
        if (!isPersonIn) {
            personsService
                .create(person)
                .then(rePersons => {
                    //console.log(rePersons)
                    //console.log('new person')

                    notiHandler(
                        `Added ${person.name}`, 'success'
                    )

                    setPersons(persons.concat(rePersons))
                    setNewName('')
                    setNewNumber('')
                })
                .catch(error => {
                    notiHandler(
                        `cannot add ${person.name}`, 'error'
                    )
                })

        } else {
            const rep = window.confirm(`${newName} is already added to phonebook, replace th old number with a new one?`)
            const cPerson = { ...isPersonIn, number: newNumber }
            if (rep) {
                personsService
                    .update(isPersonIn.id, cPerson)
                    .then(rePersons => {
                        notiHandler(`Updated ${cPerson.name} new number`, 'success')
                        setPersons(persons.map(p => p.id !== isPersonIn.id ? p : rePersons))
                        setNewName('')
                        setNewNumber('')
                    }).catch((error) => {
                        notiHandler(`${cPerson.name} new number not saved to server, ${cPerson.name} was already removed from server`, 'error')
                        setPersons(persons.filter(p => p.id !== cPerson.id))
                        setNewName('')
                        setNewNumber('')
                    })
            }
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
            <Notification emessage={errorMessage} />
            <Filter newFilter={newFilter} handleFilter={handleFilter} />

            <h3>Add a new</h3>

            <PersonForm
                data={formControl}
                addNewName={addNewName}
            />

            <h3>Numbers</h3>

            <Persons persons={persons} filter={newFilter} handler={deleteHandler} />
        </div>
    )

}

export default App