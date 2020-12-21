export const setMessage = (message, type, time) => {
    return async dispatch => {
        dispatch({
            type: 'SET_MESSAGE',
            message: [message, type],
        })
        setTimeout(() => {
            dispatch({
                type: 'SET_MESSAGE',
                message: null,
            })
        }, time*1000)
    }
}

const notificationReducer = (state = null, action) => {
    switch (action.type) {
    case 'SET_MESSAGE':
        return action.message
    default:
        return state
    }
}

export default notificationReducer