import React, {useEffect} from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import { initializeAnec } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import anecdotesService from './service/anecdotes'

const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    anecdotesService
      .getAll().then(x => dispatch(initializeAnec(x)))
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App