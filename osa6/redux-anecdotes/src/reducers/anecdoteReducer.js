

export const createAnec = (data) => {
  return {
    type: 'CREATE',
    data
  }
}

export const voteAnec = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const initializeAnec = (dotes) => {
  return {
    type: 'INIT_DOTES',
    data: dotes,
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