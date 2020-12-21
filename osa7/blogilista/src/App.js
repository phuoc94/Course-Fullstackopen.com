import React, {  useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import Togglable from './components/Togglable'
import { initializeBlogs } from './reducer/blogsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { userIsIn, userLogout } from './reducer/userReducer'

const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeBlogs())
        dispatch(userIsIn())
    },[dispatch])

    const user = useSelector(state => state.user)

    return (
        <div className="container mx-auto px-4 min-h-screen max-w-screen-lg">
            <h2 className="text-7xl flex justify-center mb-5">Blogs</h2>
            <Notification />
            {
                user === null
                    ? <div className="h-96 flex items-center justify-center"><Togglable buttonLabel='login'><LoginForm /></Togglable></div>
                    : <div className="flex justify-between">
                        <div className="py-4 order-2">
                            <span className="py-2 mx-5 text-xl">Welcome {user.name}!</span>
                            <button onClick={() => dispatch(userLogout())}
                                className="bg-red-700 py-2 px-4 rounded-lg text-white"
                            >Logout</button>
                        </div>
                        <div>
                            <Togglable buttonLabel='Create new blog'>
                                <BlogForm />
                            </Togglable>
                        </div>
                    </div>
            }
            { user && <Blogs />}
        </div>
    )
}

export default App