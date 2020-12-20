import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'
// eslint-disable-next-line no-unused-vars
import { prettyDOM } from '@testing-library/dom'

const helpper = require('./helpper')

test('renders blog', () => {
    const component = render(
        <Blog blog={helpper.blog} />
    )
    expect(component.container).toHaveTextContent(
        'title author'
    )
    expect(component.container).not.toHaveTextContent(
        'url'
    )
})

test('click view button', () => {
    const component = render(
        <Blog blog={helpper.blog} user={helpper.user} />
    )
    expect(component.container).toHaveTextContent(
        'title author'
    )

    const button = component.getByText('view')
    fireEvent.click(button)
    expect(component.container).toHaveTextContent(
        'url'
    )
    expect(component.container).toHaveTextContent(
        'likes 9'
    )
})

test('click like button', async () => {
    const mockHandler = jest.fn()
    const component = render(
        <Blog blog={helpper.blog} user={helpper.user} setBlogs={mockHandler} />
    )
    expect(component.container).toHaveTextContent(
        'title author'
    )
    const viewbtn = component.getByText('view')
    fireEvent.click(viewbtn)
    const like = component.getByText('like')
    await fireEvent.click(like)
    await fireEvent.click(like)
    expect(mockHandler.mock.calls).toHaveLength(2)
})
