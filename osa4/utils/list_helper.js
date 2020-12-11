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

const most_blogs = (blogs) => {
    let authors = []
    _.forEach(blogs, function (value) {
        const find = _.find(authors, { 'author': value.author })
        if (find) {
            const i = _.findIndex(authors, find)
            authors[i] = { ...find, likes: find.likes + 1 }
        } else {
            const x = {
                author: value.author,
                likes: 1
            }
            authors = _.concat(authors, x)
        }
    })
    const wrong_key = favorite_blog(authors)
    const most_blogs = { blogs: wrong_key.likes, author: wrong_key.author }
    return most_blogs
}

const mostLikes = (blogs) => {
    let authors = []
    _.forEach(blogs, function (value) {
        const find = _.find(authors, { 'author': value.author })
        if (find) {
            const i = _.findIndex(authors, find)
            authors[i] = { ...find, likes: find.likes + value.likes }
        } else {
            const x = {
                author: value.author,
                likes: value.likes
            }
            authors = _.concat(authors, x)
        }
    })
    const mlikes = favorite_blog(authors)
    return mlikes
}


module.exports = {
    total_likes,
    favorite_blog,
    most_blogs,
    mostLikes
}