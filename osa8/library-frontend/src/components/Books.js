import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery} from '@apollo/client'
import { ALL_BOOKS, BOOKS_BY_GEN } from '../queries'


const Books = (props) => {
  const resultBooks = useQuery(ALL_BOOKS)
  const [getBooks, result] = useLazyQuery(BOOKS_BY_GEN)
  const [filter, setFilter] = useState(null)
  const [books, setBooks] = useState([])
  const [allBooks, setAllBooks] = useState([])

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
}, [setBooks, result])

  useEffect(() => {
    if (filter) {
        getBooks({ variables: { genre: filter } })
    }else{
      setBooks(allBooks)
    }
  }, [getBooks, filter, setBooks, allBooks])
  
  useEffect(() => {
    if (resultBooks.data) {
      setBooks(resultBooks.data.allBooks)
      setAllBooks(resultBooks.data.allBooks)
    }
  }, [setBooks, resultBooks])

  if (!props.show) {
    return null
  }
  if (result.loading)  {
    return <div>loading...</div>
  }
  const xgenres = []
  Object.keys(allBooks).forEach(key => {
    const genres = allBooks[key].genres
    genres.forEach(genre => {
      if (!xgenres.includes(genre)){
        xgenres.push(genre)
      }
    });
  });

  return (
    <div>
      <h2>books</h2>
      {filter && <p>in genre <strong>{filter}</strong></p>}
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
      <button key='all' onClick={() => setFilter(null)}>all</button>
      {xgenres.map(gen => 
        <button key={gen} onClick={() => setFilter(gen)}>{gen}</button>
        )}
    </div>
  )
}

export default Books