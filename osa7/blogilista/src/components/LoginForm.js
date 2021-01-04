import React, { useState } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { userLogin } from '../reducer/userReducer'
import { setMessage } from '../reducer/notificationReducer'

const LoginForm = () => {
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

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
            dispatch(userLogin(user))

        } catch (exception) {
            dispatch(setMessage('wrong username or password', 'error' , 5))
            setPassword('')
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <div className="py-2 w-60">
                <span className="px-1">Username</span>
                <input
                    type="text"
                    id='username'
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                    className="
                    text-xs block px-4 py-2  rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md
                    "
                />
            </div>
            <div className="py-2">
                <span className="px-1">Password</span>
                <input
                    type="password"
                    id='password'
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                    className="
                    text-xs block px-4 py-2  rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md
                    "
                />
            </div>
            <button id="login-button" type="submit"
                className="bg-green-300 my-2 py-2 px-4 rounded w-full"
            >login</button>
        </form>
    )
}
LoginForm.prototype = {
    setUser: PropTypes.func.isRequired
}

export default LoginForm