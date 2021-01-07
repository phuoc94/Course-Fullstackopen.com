import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { setMessage } from '../reducer/notificationReducer'
import { likeBlog, removeBlog, commentBlog } from '../reducer/blogsReducer'
import { Link, useLocation } from 'react-router-dom'
import blogService from '../services/blogs'



const Blog = ({ blog }) => {
    const dispatch = useDispatch()
    const [xblog, setBlog] = useState([])
    const [visible, setVisible] = useState(false)
    const [comment, setComment] = useState('')


    if(!blog){
        const path = useLocation().pathname.split('/')
        const id = path[path.length-1]
        if(!xblog.title){
            blogService.getById(id).then(re => {
                setBlog(re)
                setVisible(true)
            })
        }
        blog = xblog
    }
    if(!blog){
        return null
    }
    const user = useSelector(state => state.user)


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
    const handleComment = async (event) => {
        event.preventDefault()
        dispatch(commentBlog(blog.id, comment))
        setComment('')
    }
    if (visible) {
        return (
            <div className='px-4 py-2 my-4
            bg-gray-200 rounded border-2 shadow-lg w-full' onClick={() => setVisible(false)}>
                <Link to={`/blogs/${blog.id}`} className="text-xl text-blue-500">{blog.title}</Link>
                <p className="text-blue-500" onClick={(e) => e.stopPropagation()}><a href={blog.url}>{blog.url}</a></p>
                <p>likes {blog.likes} <button id='btn-like' onClick={likeHandler}
                    className="bg-green-300 my-1 py-1 px-2 rounded"
                >like</button></p>
                <p>by {blog.author}</p>
                { user.username === blog.user.username && <p><button id='btn-remove' onClick={deleteBlog}
                    className="bg-red-600 my-1 py-1 px-2 rounded text-white"
                >remove</button></p>}
                <div>
                    <h2 className="my-4 text-xl">Comments</h2>
                    <form onSubmit={handleComment}>
                        <input
                            type="text"
                            id='comment'
                            value={comment}
                            name="Comment"
                            onChange={({ target }) => setComment(target.value)}
                            onClick={(e) => e.stopPropagation()}
                            className="
                            text-xs px-4 py-2  rounded-lg bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md
                            "
                        />
                        <button type="submit"
                            onClick={(e) => e.stopPropagation()}
                            className="bg-green-300 my-1 mx-4 py-2 px-4 rounded"
                        >add comment</button>
                    </form>
                    <ul className="list-disc list-inside my-2 px-5">
                        {blog.comments.map((comment, index) =>
                            <li key={index}>{comment}</li>
                        )}
                    </ul>
                </div>
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
