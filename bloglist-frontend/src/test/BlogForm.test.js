import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from '../components/BlogForm'
// eslint-disable-next-line no-unused-vars
import { prettyDOM } from '@testing-library/dom'


test('renders blog', () => {
    const createBlog = jest.fn()
    const component = render(
        <BlogForm setBlogs={createBlog} />
    )
    const title = component.container.querySelector('input[name = \'title\']')
    fireEvent.change(title, { target: { value: 'titletest' } })
    const author = component.container.querySelector('input[name = \'author\']')
    fireEvent.change(author, { target: { value: 'authortest' } })
    const url = component.container.querySelector('input[name = \'url\']')
    fireEvent.change(url, { target: { value: 'urltest' } })
    const form = component.container.querySelector('form')
    fireEvent.submit(form)
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('titletest')
    expect(createBlog.mock.calls[0][0].author).toBe('authortest')
    expect(createBlog.mock.calls[0][0].url).toBe('urltest')

})