import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
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

  const notiHandler = (message, type) => {
    setErrorMessage(
      [message, type]
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification emessage={errorMessage} />

      {
        user === null
          ? <LoginForm setUser={setUser} notiHandler={notiHandler} />
          : <div>
            <p>
              {user.name} logged in
              <button onClick={logout}>Logout</button>
            </p>
            <BlogForm setBlogs={setBlogs} blogs={blogs} notiHandler={notiHandler} />
          </div>
      }
      {
        user !== null &&
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />)
      }


    </div>
  )
}

export default App