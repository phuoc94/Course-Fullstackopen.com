import React from 'react'

const BlogForm = ({ data, addBlog }) => {
    const title = data.state.title
    const author = data.state.author
    const url = data.state.url
    const setTitle = data.handlers.handleTitleChange
    const setAuthor = data.handlers.handleAuthorChange
    const setUrl = data.handlers.handleUrlChange

    return (
        <form onSubmit={addBlog}>
            <div>
                <h2>Create new blog</h2>
                title:
            <input
                    type="text"
                    value={title}
                    name="title"
                    onChange={setTitle}
                />
            </div>
            <div>
                author:
            <input
                    type="text"
                    value={author}
                    name="author"
                    onChange={setAuthor}
                />
            </div>
            <div>
                url:
            <input
                    type="text"
                    value={url}
                    name="url"
                    onChange={setUrl}
                />
            </div>
            <button type="submit">create</button>
        </form>
    )
}

export default BlogForm