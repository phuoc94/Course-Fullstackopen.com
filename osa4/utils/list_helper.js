var _ = require('lodash')

const total_likes = (blogs) => {
    const total = Object.values(blogs).reduce((t, { likes }) => t + likes, 0)
    return total
}

const favorite_blog = (blogs) => {
    let most_like = 0
    let f_blog = {}
    blogs.forEach(blog => {
        if (blog.likes > most_like) {
            most_like = blog.likes
            f_blog = blog
        }
    })
    return f_blog
}

module.exports = {
    total_likes,
    favorite_blog
}