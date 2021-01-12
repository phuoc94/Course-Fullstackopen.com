const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
require('dotenv').config()
mongoose.set('useFindAndModify', false)
const MONGODB_URI = process.env.MONGODB_URI

mongoose.set('useCreateIndex', true)
console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
  console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })
  const books = []
  const authors = []
const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Author {
    id: ID!
    name: String!
    bookCount: Int
    born: Int
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      if(!args.author && !args.genre){
        return Book.find({})
      }
      /*
      if(args.author && args.genre){
        const x = books.filter(b => b.author === args.author)
        return x.filter(b => b.genres.includes(args.genre))
      }
      *//*
      if(args.author){
        return books.filter(b => b.author === args.author)
      }else if(args.genre){
        return books.filter(b => b.genres.includes(args.genre))
      }else{
        return null
      }*/
    },
    allAuthors: () => Author.find({}),
  },
  /*
  Author: {
    bookCount: (root) => {
      const authorBooks = books.filter(b => b.author === root.name)
      return authorBooks.length
    }
  },*/
  Mutation: {
    addBook: async (root, args) => {
      const author = await Author.findOne({ name: args.author })
      if(author === null){
        const author = new Author({name: args.author})
        author.save()
        const book = new Book({ ...args, author })
        return book.save()
      }else{
        const book = new Book({ ...args, author })
        return book.save()
      }
    },
    /*
    editAuthor: (root, args) => {
      const author = authors.find(a => a.name === args.name)
      if (!author) {
        return null
      }
      const updatedAuthor = { ...author, born: args.setBornTo }
      authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
      return updatedAuthor
    }*/
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})