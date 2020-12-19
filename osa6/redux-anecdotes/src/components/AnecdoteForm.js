import React from 'react'
import { connect } from 'react-redux'
import { createAnec } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {

    const createAnecdote = async(event) => {
        event.preventDefault()
        const anec = event.target.input.value
        event.target.input.value = ''
        props.createAnec(anec)
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
export default connect(null, { createAnec })(AnecdoteForm)
