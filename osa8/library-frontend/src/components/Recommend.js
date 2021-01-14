import React, { useEffect, useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { BOOKS_BY_GEN, ME } from '../queries'



export const Recommend = (props) => {
    const user = useQuery(ME)
    const [getBooks, result] = useLazyQuery(BOOKS_BY_GEN)
    const [books, setBooks] = useState([])

    useEffect(() => {
        if (result.data) {
            setBooks(result.data.allBooks)
        }
    }, [setBooks, result])

    useEffect(() => {
        if (user.data) {
            getBooks({ variables: { genre: user.data.me.favoriteGenre } })
        }
    }, [getBooks, user])

    if (!props.show) {
        return null
    }
    
    return (
        <div>
            <h2>recommendations</h2>
            <p>books in your favorite genre <strong>{user.data.me.favoriteGenre}</strong></p>
            
            <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
            <th>
              genres
            </th>
          </tr>
          {books.map(book =>
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
              <td>{book.genres.map(genre => `${genre}, `)}</td>
            </tr>
          )}
        </tbody>
      </table>
        </div>
    )
}
