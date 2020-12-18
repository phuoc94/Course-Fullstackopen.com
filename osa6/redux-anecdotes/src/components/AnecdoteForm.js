import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnec } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'
import anecdotesService from '../service/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createAnecdote = async(event) => {
        event.preventDefault()
        const anec = event.target.input.value
        event.target.input.value = ''
        const newAnec = await anecdotesService.createNew(anec)
        console.log('new', newAnec)
        dispatch(createAnec(newAnec))

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
