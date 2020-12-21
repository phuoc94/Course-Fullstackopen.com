import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'


const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs.sort((a, b) => a.likes < b.likes ? 1 : -1))
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])


    const logout = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
    }

    const FormRef = useRef()
    const notiHandler = useRef()


    return (
        <div className="container mx-auto px-4 min-h-screen max-w-screen-lg">
            <h2 className="text-7xl flex justify-center mb-5">Blogs</h2>
            <Notification ref={notiHandler} />

            {
                user === null
                    ? <div className="h-96 flex items-center justify-center"><Togglable buttonLabel='login'><LoginForm setUser={setUser} notiHandler={notiHandler} /></Togglable></div>
                    : <div className="flex justify-between">
                        <div className="py-4 order-2">
                            <span className="py-2 mx-5 text-xl">Welcome {user.name}!</span>
                            <button onClick={logout}
                                className="bg-red-700 py-2 px-4 rounded-lg text-white"
                            >Logout</button>
                        </div>
                        <div>
                            <Togglable buttonLabel='Create new blog' ref={FormRef}>
                                <BlogForm setBlogs={setBlogs} blogs={blogs} user={user} notiHandler={notiHandler} FormRef={FormRef} />
                            </Togglable>
                        </div>
                    </div>
            }
            {
                user !== null &&
        blogs.map(blog =>
            <Blog key={blog.id} blog={blog} setBlogs={setBlogs} blogs={blogs} user={user} notiHandler={notiHandler} />)
            }


        </div>
    )
}

export default App