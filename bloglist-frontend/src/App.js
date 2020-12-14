import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
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


  const notiHandler = (message, type) => {
    setErrorMessage(
      [message, type]
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 50000)
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const FormRef = useRef()

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
            <Togglable buttonLabel='Create new blog' ref={FormRef}>
              <BlogForm setBlogs={setBlogs} blogs={blogs} notiHandler={notiHandler} FormRef={FormRef} />
            </Togglable>
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