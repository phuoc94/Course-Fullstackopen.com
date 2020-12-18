import anecdotesService from '../service/anecdotes'
import { setMessage } from '../reducers/notificationReducer'


export const createAnec = (data) => {
  return async dispatch => {
    const newAnec = await anecdotesService.createNew(data)
    dispatch(setMessage(`you created ${data}`, 5))
    dispatch({
      type: 'CREATE',
      data: newAnec
    })
  }
}

export const voteAnec = (id) => {
  return async dispatch => {
    await anecdotesService.like(id)
    const dotes = await anecdotesService.getById(id)
    dispatch(setMessage(`you voted '${dotes.content}'`, 10))
    dispatch({
      type: 'VOTE',
      data: {id},
    })
  }
}

export const initializeAnec = () => {
  return async dispatch => {
    const dotes = await anecdotesService.getAll()
    dispatch({
      type: 'INIT_DOTES',
      data: dotes,
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  //console.log('state now: ', state)
  //console.log('action', action)
  switch (action.type) {
    case 'CREATE':
      return [...state, action.data]
    case 'INIT_DOTES':
      return action.data
    case 'VOTE':
      const id = action.data.id
      const anecChange = state.find(x => x.id === id)
      const changedAnec = {
        ...anecChange, votes: anecChange.votes + 1
      }
      return state.map(x =>
        x.id !== id ? x : changedAnec
      )
    default: return state
  }
}

export default anecdoteReducer