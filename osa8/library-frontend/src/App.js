
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import {useSubscription, useApolloClient, useMutation } from '@apollo/client'
import { Recommend } from './components/Recommend'
import { BOOK_ADDED,ALL_BOOKS, ALL_AUTHORS, BOOKS_BY_GEN, REFETCH } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()
  const loggedUserJSON = window.localStorage.getItem('library-token')
  const [genres, setGenres] = useState([])

  if(loggedUserJSON && !token){
    setToken(loggedUserJSON)
  }

  const getQueries = () => {
    const refetchQueriesArray = [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
    genres.map(gen => refetchQueriesArray.push(
      {query: BOOKS_BY_GEN, 
        variables: { genre: gen } 
      }
    ))
    return refetchQueriesArray
  } 

  const [refetch] = useMutation(REFETCH, {
    refetchQueries: getQueries
  })

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      alert(`New book added, book title is ${subscriptionData.data.bookAdded.title}`)
      console.log(subscriptionData)
      setGenres(subscriptionData.data.bookAdded.genres)
      refetch()
    }
  })

  const Notify = ({ errorMessage }) => {
    if ( !errorMessage ) {
      return null
    }
  
    return (
      <div style={{color: 'red'}}>
        {errorMessage}
      </div>
    )
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommend
        show={page === 'recommend'}
      />

    </div>
  )
}

export default App