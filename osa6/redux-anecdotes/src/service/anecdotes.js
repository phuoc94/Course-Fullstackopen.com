import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const createNew = async (content) => {
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
  }

const like = async (id) => {
    const dotes = await axios.get(`${baseUrl}/${id}`)
    const newDots = {...dotes.data, votes: dotes.data.votes + 1}
    const response = axios.put(`${baseUrl}/${id}`, newDots);
    return response.data
  }

export default { getAll, createNew, like, getById }