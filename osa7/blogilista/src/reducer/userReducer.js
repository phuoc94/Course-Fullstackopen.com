export const userLogin = (user) => {
    return async dispatch => {
        dispatch({
            type: 'LOGIN',
            user: {
                username: user.username,
                name: user.name }
        })
    }
}
export const userLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    return async dispatch => {
        dispatch({
            type: 'LOGOUT',
            user: null,
        })
    }
}

export const userIsIn = () => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    const user = JSON.parse(loggedUserJSON)
    return async dispatch => {
        dispatch({
            type: 'USERISIN',
            user
        })
    }
}


const userReducer = (state = null, action) => {
    switch (action.type) {
    case 'LOGIN':
        return action.user
    case 'LOGOUT':
        return action.user
    case 'USERISIN':
        return action.user
    default:
        return state
    }
}

export default userReducer