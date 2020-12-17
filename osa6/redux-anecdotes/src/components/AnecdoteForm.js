import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnec } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const createAnecdote = (event) => {
        event.preventDefault()
        const anec = event.target.input.value
        event.target.input.value = ''
        dispatch(createAnec(anec))
        dispatch(setMessage(`you created ${anec}`))
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
