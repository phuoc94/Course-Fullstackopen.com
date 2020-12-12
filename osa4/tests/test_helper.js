const Blog = require('../models/blog')
const User = require('../models/user')


const initialBlogs = [
    {
        author: 'String',
        title: 'String',
        url: 'String',
        likes: 0
    },
    {
        author: 'asdasd',
        title: 'assaasd',
        url: 'asdasdasd',
        likes: 10
    },
]

const nonExistingId = async () => {

    const blog = new Blog({ author: 'nonexis', title: 'String', url: 'String' })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(b => b.toJSON())
}
const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb,
}