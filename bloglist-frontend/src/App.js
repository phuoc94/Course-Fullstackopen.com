import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'




const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')



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

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notiHandler('wrong username or password', 'error')
      setPassword('')
    }
  }

  const handleUsernameChange = async (event) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = async (event) => {
    setPassword(event.target.value)
  }
  const LoginFormData = {
    state: {
      username,
      password
    },
    handlers: {
      handleUsernameChange,
      handlePasswordChange
    }
  }
  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const blog = await blogService.create({
        title, author, url
      })

      setBlogs(blogs.concat(blog))
      notiHandler(`a new blog ${title} by ${author} added`, 'success')
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      notiHandler(`${exception}`, 'error')
    }
  }
  const handleTitleChange = async (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = async (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = async (event) => {
    setUrl(event.target.value)
  }

  const BlogFormData = {
    state: {
      title,
      author,
      url
    },
    handlers: {
      handleTitleChange,
      handleAuthorChange,
      handleUrlChange
    }
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification emessage={errorMessage} />

      {
        user === null
          ? <LoginForm data={LoginFormData} handleLogin={handleLogin} />
          : <div>
            <p>
              {user.name} logged in
              <button onClick={logout}>Logout</button>
            </p>
            <BlogForm data={BlogFormData} addBlog={addBlog} />
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