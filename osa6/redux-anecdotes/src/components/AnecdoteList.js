import React from 'react'
import { connect } from 'react-redux'
import { voteAnec } from '../reducers/anecdoteReducer'


const AnecdoteList = (props) => {
    return(
        <>
      {props.dotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => props.voteAnec(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      </>
    )
}
const mapStateToProps = (state) => {
  const filtered = state.dotes.filter(d => d.content.includes(state.filter))
  const sorted = filtered.sort((a, b) => {
    if(a.votes === b.votes){
        return 0
    } else if( a.votes < b.votes){
        return 1
    }else{
        return -1
    }
  })

  return {
    dotes: sorted,
    filter: state.filter,
  }
  
}

const mapDispatchToProps = {
  voteAnec
}

const ConnectedDotes = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedDotes
