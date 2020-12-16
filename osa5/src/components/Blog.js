import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'



const Blog = ({ blog, setBlogs, blogs, user, notiHandler }) => {
    const [visible, setVisible] = useState(false)
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const likeHandler = async () => {
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

    const deleteBlog = async () => {
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
            <div className='blog' style={blogStyle}>
                <p>{blog.title} <button className='button' id='btn-hide' onClick={() => setVisible(false)}>hide</button></p>
                <p><a href={blog.url}>{blog.url}</a></p>
                <p>likes {blog.likes} <button className='button' id='btn-like' onClick={likeHandler}>like</button></p>
                <p>{blog.author}</p>
                { user.username === blog.user.username && <p><button className='button' id='btn-remove' onClick={deleteBlog}>remove</button></p>}
            </div>
        )
    }
    return (
        <div className='blog' style={blogStyle}>
            {blog.title} {blog.author} <button className='button' id='btn-view' onClick={() => setVisible(true)}>view</button>
        </div>
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
