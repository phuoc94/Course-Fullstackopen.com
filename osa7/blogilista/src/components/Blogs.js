import React from 'react'
import { useSelector } from 'react-redux'

const Blogs = () => {
    const blogs = useSelector(state => state.blogs)
    console.log(blogs)
    return (
        blogs.map(blog =>
            <div key={blog.id}>{blog.title}</div>
        )
    )
}

export default Blogs