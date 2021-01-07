import React, { useState,useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import userService from '../services/users'
import { useSelector } from 'react-redux'



const User = () => {
    const path = useLocation().pathname.split('/')
    const id = path[path.length-1]
    const [user, setUser] = useState([])
    const blogs = useSelector(state => state.blogs)
    const userBlogs = blogs.filter(x => x.user.id === id)

    useEffect(() => {
        userService.getAll(id).then(re => {
            setUser(re.find(x => x.id === id))
        })
    },[])
    return (
        <div className="my-2">
            <h1 className="text-3xl">{user.name}</h1>
            <h4 className="my-2">added blogs</h4>
            <ul className="list-disc list-inside my-2">
                {userBlogs.map(blog =>
                    <li key={blog.id}>{blog.title}</li>
                )}
            </ul>
        </div>
    )
}

export default User
