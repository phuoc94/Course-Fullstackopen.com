import blogService from '../services/blogs'
import { setMessage } from './notificationReducer'

export const createBlog = (data) => {
    const user = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))

    return async dispatch => {
        await blogService.setToken(user.token)
        const newBlog = await blogService.create(data)
        const nblog = {
            ...newBlog, user: {
                username: user.username,
            }
        }
        dispatch(setMessage(`you created ${data.title}`,'success', 5))
        dispatch({
            type: 'CREATE',
            data: nblog
        })
    }
}

export const likeBlog = (id) => {
    return async dispatch => {
        const blog = await blogService.getById(id)
        const upObj = { likes: blog.likes + 1 }
        await blogService.update(id, upObj)
        dispatch(setMessage(`you liked '${blog.title}'`,'success', 10))
        dispatch({
            type: 'LIKE',
            data: { id },
        })
    }
}
export const removeBlog = (id) => {
    return async dispatch => {
        const user = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
        const blog = await blogService.getById(id)
        await blogService.setToken(user.token)
        blogService.remove(id)
        dispatch(setMessage(`you removed '${blog.title}'`,'success', 10))
        dispatch({
            type: 'REMOVE',
            data: { id },
        })
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs,
        })
    }
}

const blogsReducer = (state = [], action) => {
    switch (action.type) {
    case 'CREATE':{
        return state.concat(action.data)
    }
    case 'INIT_BLOGS':
        return action.data
    case 'REMOVE':{
        const id = action.data.id
        return state.filter(x => x.id !== id)
    }
    case 'LIKE': {
        const id = action.data.id
        const blogChange = state.find(x => x.id === id)
        const changedBlog = {
            ...blogChange, likes: blogChange.likes + 1
        }
        return state.map(x =>
            x.id !== id ? x : changedBlog
        )
    }
    default: return state
    }
}

export default blogsReducer