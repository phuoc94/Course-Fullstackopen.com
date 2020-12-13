import React from 'react'

const LoginForm = ({ data, handleLogin }) => {
    const username = data.state.username
    const password = data.state.password
    const setUsername = data.handlers.handleUsernameChange
    const setPassword = data.handlers.handlePasswordChange
    return (
        <form onSubmit={handleLogin}>
            <div>
                username
          <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={setUsername}
                />
            </div>
            <div>
                password
          <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={setPassword}
                />
            </div>
            <button type="submit">login</button>
        </form>
    )
}

export default LoginForm