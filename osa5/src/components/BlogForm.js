import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'


const BlogForm = ({ setBlogs, blogs, user, notiHandler, FormRef }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')


    const addBlog = async (event) => {
        event.preventDefault()
        if (process.env.NODE_ENV === 'test') {
            setBlogs({ title, author, url })
        } else {
            try {
                const blog = await blogService.create({
                    title, author, url
                })
                const nblog = {
                    ...blog, user: {
                        username: user.username
                    }
                }
                setBlogs(blogs.concat(nblog))
                notiHandler.current.notiHandler(`a new blog ${title} by ${author} added`, 'success')
                setTitle('')
                setAuthor('')
                setUrl('')
                FormRef.current.toggleVisibility()
            } catch (exception) {
                notiHandler.current.notiHandler(`${exception}`, 'error')
            }
        }
    }

    return (
        <form onSubmit={addBlog}>
            <div>
                <h2>Create new blog</h2>
                title:
                <input
                    type="text"
                    value={title}
                    id="title"
                    name="title"
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                author:
                <input
                    type="text"
                    value={author}
                    id="author"
                    name="author"
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                url:
                <input
                    type="text"
                    value={url}
                    id="url"
                    name="url"
                    onChange={({ target }) => setUrl(target.value)}
                />
            </div>
            <button id="create-button" type="submit">create</button>
        </form>
    )
}

BlogForm.prototype = {
    setBlogs: PropTypes.func.isRequired,
    notiHandler: PropTypes.func.isRequired,
    blogs: PropTypes.array.isRequired
}

export default BlogForm