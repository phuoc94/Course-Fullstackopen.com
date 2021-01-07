import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import userService from '../services/users'


const Users = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        userService.getAll().then(re => {
            setUsers(re)
        })
    },[])
    return (
        <div className="py-2">
            <h1 className="text-3xl">Users</h1>
            <table className="table-auto my-4">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user =>
                        <tr key={user.username}>
                            <td><Link to={`/users/${user.id}`} className="text-blue-500">{user.name}</Link></td>
                            <td className="text-center">{user.blogs.length}</td>

                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Users
