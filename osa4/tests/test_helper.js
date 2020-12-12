const Blog = require('../models/blog')


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

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}