import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { EDIT_AUTHORS, ALL_AUTHORS } from '../queries'
import Select from 'react-select';

export const EditAuthor = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [born, setBorn] = useState('')
  const [editAuthor] = useMutation(EDIT_AUTHORS, {
    refetchQueries: [ { query: ALL_AUTHORS }],
  })
  const result = useQuery(ALL_AUTHORS)
  const options = result.data.allAuthors.map(x => ({value: x.name, label: x.name}))
  const submit = async (event) => {
    event.preventDefault()
    const name = selectedOption.value
    console.log(name)
    editAuthor({variables: { name, born: parseInt(born)}})
    setSelectedOption(null)
    setBorn('')
  }
    return (
        <div>
            <h2>Set birthyear</h2>
            <form onSubmit={submit}>
                <div>
                <Select
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  options={options}
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
