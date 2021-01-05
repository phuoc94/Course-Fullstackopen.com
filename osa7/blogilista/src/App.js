import React, {  useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { initializeBlogs } from './reducer/blogsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { userIsIn } from './reducer/userReducer'
import LoggedIn from './components/LoggedIn'

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
            <Notification/>
            {
                user === null
                    ? <div className="h-96 flex items-center justify-center"><Togglable buttonLabel='login'><LoginForm /></Togglable></div>
                    : <LoggedIn/>
            }
        </div>
    )
}

export default App