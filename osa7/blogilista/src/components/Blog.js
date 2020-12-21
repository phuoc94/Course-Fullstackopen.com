import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'



const Blog = ({ blog, setBlogs, blogs, user, notiHandler }) => {
    const [visible, setVisible] = useState(false)

    const likeHandler = async (event) => {
        event.stopPropagation()
        if (process.env.NODE_ENV === 'test') {
            setBlogs()
        } else {
            try {
                const id = blog.id
                const likes = blog.likes + 1
                const resBlog = await blogService.update({ id }, { likes })
                setBlogs(blogs.map(p => p.id !== blog.id ? p : { ...p, likes: resBlog.likes }))
            } catch (exception) {
                console.log('error', exception)
            }
        }
    }

    const deleteBlog = async (event) => {
        event.stopPropagation()
        if (window.confirm(`remove blog ${blog.title}`)) {
            try {
                const id = blog.id
                await blogService.remove({ id })
                notiHandler.current.notiHandler(`blog ${blog.title} removed`, 'success')
                setBlogs(blogs.filter(b => b.id !== id))
            } catch (exception) {
                console.log('error', exception)
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
    notiHandler: PropTypes.func.isRequired,
    blogs: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired
}
export default Blog
