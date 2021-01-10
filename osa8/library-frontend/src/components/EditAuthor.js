import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHORS, ALL_AUTHORS } from '../queries'


export const EditAuthor = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [editAuthor] = useMutation(EDIT_AUTHORS, {
    refetchQueries: [ { query: ALL_AUTHORS }],
  })
  const submit = async (event) => {
    event.preventDefault()
    editAuthor({variables: { name, born: parseInt(born)}})
    setName('')
    setBorn('')
  }
    return (
        <div>
            <h2>Set birthyear</h2>
            <form onSubmit={submit}>
                <div>
                    name
                    <input
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                    />
                </div>
                <div>
                    born
                    <input
                    value={born}
                    onChange={({ target }) => setBorn(target.value)}
                    />
                </div>
                <button type='submit'>update author</button>
             </form>
        </div>
    )
}
