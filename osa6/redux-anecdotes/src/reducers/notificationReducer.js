export const setMessage = message => {
    return {
      type: 'SET_MESSAGE',
      message,
    }
  }

  const notificationReducer = (state = null, action) => {
    //console.log('state now: ', state)
    //console.log('action', action)
    switch (action.type) {
      case 'SET_MESSAGE':
        return action.message
      default:
        return state
    }
  }

export default notificationReducer