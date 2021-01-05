import React from 'react'
import Blogs from './Blogs'
import Blog from './Blog'
import BlogForm from './BlogForm'
import { Switch, Route, Link } from 'react-router-dom'
import Togglable from './Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../reducer/userReducer'
import Users from './Users'

function LoggedIn() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    return (
        <div>
            <div className="flex justify-between">
                <div className="py-2 order-2">
                    <span className="mx-5 text-xl">Welcome {user.name}!</span>
                    <button onClick={() => dispatch(userLogout())}
                        className="bg-red-700 py-2 px-4 rounded-lg text-white"
                    >Logout</button>
                </div>
                <div className="flex items-center">
                    <Link to='/' className="pl-0 px-4 text-xl">Blogs</Link>
                    <Link to='/users' className="px-4 text-xl">Users</Link>
                </div>
            </div>
            <hr className="h-1 border-0 bg-gray-200 rounded"/>

            <Switch>
                <Route path="/blogs/:id">
                    <Blog/>
                </Route>
                <Route path="/users">
                    <Users/>
                </Route>
                <Route path="/">
                    <div>
                        <Togglable buttonLabel='Create new blog'>
                            <BlogForm />
                        </Togglable>
                        { user && <Blogs />}
                    </div>
                </Route>
            </Switch>
        </div>
    )
}

export default LoggedIn
