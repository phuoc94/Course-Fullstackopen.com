import blogService from '../services/blogs'
import { setMessage } from './notificationReducer'


export const createBlog = (data) => {
    return async dispatch => {
        const newBlog = await blogService.createNew(data)
        dispatch(setMessage(`you created ${data}`, 5))
        dispatch({
            type: 'CREATE',
            data: newBlog
        })
    }
}

export const likeBlog = (id) => {
    return async dispatch => {
        await blogService.like(id)
        const blog = await blogService.getById(id)
        dispatch(setMessage(`you liked '${blog.title}'`, 10))
        dispatch({
            type: 'LIKE',
            data: { id },
        })
    }
}
export const removeBlog = (id) => {
    return async dispatch => {
        await blogService.remove(id)
        const blog = await blogService.getById(id)
        dispatch(setMessage(`you removed '${blog.title}'`, 10))
        dispatch({
            type: 'REMOVE',
            data: { id },
        })
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        console.log('b', blogs)
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs,
        })
    }
}

const blogsReducer = (state = [], action) => {
    console.log('bs',state)
    console.log('ba',action)
    switch (action.type) {
    case 'CREATE':
        return state
    case 'INIT_BLOGS':
        return action.data
    case 'REMOVE':
        return state
    case 'LIKE':
        return state
    default: return state
    }
}

export default blogsReducer