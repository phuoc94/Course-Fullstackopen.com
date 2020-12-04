import React from 'react'

const PersonForm = ({ data, addNewName }) => {
    const newName = data.state.newName
    const newNumber = data.state.newNumber
    const handleNewNameChange = data.handlers.handleNewNameChange
    const handleNewNumberChange = data.handlers.handleNewNumberChange
    return (
        <form onSubmit={addNewName}>
            <div>
                name: <input value={newName} onChange={handleNewNameChange} />
            </div>
            <div>number: <input value={newNumber} onChange={handleNewNumberChange} /></div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm