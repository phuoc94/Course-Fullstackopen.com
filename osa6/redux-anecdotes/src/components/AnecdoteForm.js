import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnec } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createAnecdote = (event) => {
        event.preventDefault()
        const anec = event.target.input.value
        event.target.input.value = ''
        dispatch(createAnec(anec))
      }
    
    return(
        <>
            <h2>create new</h2>
            <form onSubmit={createAnecdote}>
            <div><input name="input" /></div>
            <button>create</button>
            </form>
        </>
    )
}
export default AnecdoteForm
