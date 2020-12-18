import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnec } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'
import anecdotesService from '../service/anecdotes'


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
        await anecdotesService.like(id)
        dispatch(voteAnec(id))
        const finded = anecdotes.find(x => x.id === id)
        const message = `you voted '${finded.content}'`
        dispatch(setMessage(message))
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
