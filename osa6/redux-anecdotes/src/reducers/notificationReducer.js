let notiTimeout

export const setMessage = (message, time) => {
    return async dispatch => {
      dispatch({
        type: 'SET_MESSAGE',
        message,
      })
      clearTimeout(notiTimeout)
      notiTimeout = setTimeout(() => {
        dispatch({
          type: 'SET_MESSAGE',
          message: null,
        })
      }, time*1000)
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