import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducer/blogsReducer'



const BlogForm = () => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const dispatch = useDispatch()

    const addBlog = async (event) => {
        event.preventDefault()
        try {
            dispatch(createBlog({ title, author, url }))
            setTitle('')
            setAuthor('')
            setUrl('')
        } catch (exception) {
            console.log(exception)
        }
    }

    return (
        <form onSubmit={addBlog}>
            <div className="grid grid-cols-4 gap-4">
                <h2 className="col-span-4 flex justify-self-center text-2xl">Create new blog</h2>
                <span>Title:</span>
                <input
                    type="text"
                    value={title}
                    id="title"
                    name="title"
                    onChange={({ target }) => setTitle(target.value)}
                    className="col-span-3
                    text-xs block px-4 py-2  rounded w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md"
                />
                <span >Author: </span>
                <input
                    type="text"
                    value={author}
                    id="author"
                    name="author"
                    onChange={({ target }) => setAuthor(target.value)}
                    className="col-span-3
                    text-xs block px-4 py-2 rounded w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md"

                />
                <span>Url:</span>
                <input
                    type="text"
                    value={url}
                    id="url"
                    name="url"
                    onChange={({ target }) => setUrl(target.value)}
                    className="col-span-3
                    text-xs block px-4 py-2  rounded w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md"
                />
                <button id="create-button" type="submit"
                    className="bg-green-300 my-2 py-2 px-4 rounded w-full col-span-4"
                >create</button>
            </div>
        </form>
    )
}

export default BlogForm