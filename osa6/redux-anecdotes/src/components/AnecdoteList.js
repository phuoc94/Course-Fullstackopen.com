import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnec } from '../reducers/anecdoteReducer'


const AnecdoteList = () => {
    const notSortedanecdotes = useSelector(state => {
        return state.dotes.filter(d => d.content.includes(state.filter))
    })
    const notfiltered = notSortedanecdotes.sort((a, b) => {
        if(a.votes === b.votes){
            return 0
        } else if( a.votes < b.votes){
            return 1
        }else{
            return -1
        }
    })
    const anecdotes = notfiltered
    const dispatch = useDispatch()
    
    const vote = async(id) => {
        dispatch(voteAnec(id))
    }

    return(
        <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      </>
    )
}
export default AnecdoteList
