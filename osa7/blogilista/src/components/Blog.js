import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { setMessage } from '../reducer/notificationReducer'
import { likeBlog, removeBlog } from '../reducer/blogsReducer'


const Blog = ({ blog }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const [visible, setVisible] = useState(false)

    const likeHandler = async (event) => {
        event.stopPropagation()
        try {
            dispatch(likeBlog(blog.id))
        } catch (exception) {
            dispatch(setMessage(`${exception}`, 'error' , 5))
        }
    }

    const deleteBlog = async (event) => {
        event.stopPropagation()
        if (window.confirm(`remove blog ${blog.title}`)) {
            try {
                dispatch(removeBlog(blog.id))
            } catch (exception) {
                dispatch(setMessage(`${exception}`, 'error' , 5))
            }
        }
    }

    if (visible) {
        return (
            <div className='px-4 py-2 my-4
            bg-gray-200 rounded border-2 shadow-lg w-full' onClick={() => setVisible(false)}>
                <p className="text-xl">{blog.title}</p>
                <p className="text-blue-500"><a href={blog.url}>{blog.url}</a></p>
                <p>likes {blog.likes} <button id='btn-like' onClick={likeHandler}
                    className="bg-green-300 my-1 py-1 px-2 rounded"
                >like</button></p>
                <p>by {blog.author}</p>
                { user.username === blog.user.username && <p><button id='btn-remove' onClick={deleteBlog}
                    className="bg-red-600 my-1 py-1 px-2 rounded text-white"
                >remove</button></p>}
            </div>
        )
    }
    return (
        <button className='flex justify-between px-4 py-2 my-4
        bg-gray-200 rounded border-2 shadow-lg w-full
        ' onClick={() => setVisible(true)}>
            {blog.title}
        </button>
    )
}

Blog.prototype = {
    blog: PropTypes.object.isRequired,
    setBlogs: PropTypes.func.isRequired,
    blogs: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired
}
export default Blog
