const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [...helper.initialBlogs]
beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
})

test('blog identifier is id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('the first blog title is String', async () => {
    const response = await api.get('/api/blogs')
    const title = response.body.map(b => b.title)
    expect(title).toContain(
        'String'
    )
})

test('a valid blog can be added ', async () => {
    const newBlog = {
        author: 'async',
        title: 'await',
        url: 'added',
        likes: 1
    }
    const token = await helper.token()
    await api
        .post('/api/blogs')
        .set({Authorization:'bearer ' + token})
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)


    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)

    const title = blogsAtEnd.map(b => b.title)
    expect(title).toContain(
        'await'
    )
})

test('create blog without token = 401 ', async () => {
    const newBlog = {
        author: 'async',
        title: 'await',
        url: 'added',
        likes: 1
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)

})

test('like is 0 if not post likes', async () => {
    const newBlog = {
        author: 'like',
        title: 'post',
        url: 'likes',
    }
    const token = await helper.token()
    await api
        .post('/api/blogs')
        .set({Authorization:'bearer ' + token})
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)


    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)

    const likes = blogsAtEnd[blogsAtEnd.length - 1].likes
    expect(likes).toBe(0)
})

test('blog without title is not added', async () => {
    const newBlog = {
        author: 'async',
        url: 'added',
        likes: 1
    }
    const token = await helper.token()
    await api
        .post('/api/blogs')
        .set({Authorization:'bearer ' + token})
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(initialBlogs.length)
})

test('blog without url is not added', async () => {
    const newBlog = {
        author: 'async',
        title: 'added',
        likes: 1
    }
    const token = await helper.token()
    await api
        .post('/api/blogs')
        .set({Authorization:'bearer ' + token})
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(initialBlogs.length)
})

test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body).toEqual(processedBlogToView)
})

test('delete without token = 401', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(401)

})

afterAll(() => {
    mongoose.connection.close()
})