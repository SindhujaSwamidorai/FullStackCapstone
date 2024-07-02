const express = require('express')
const { Sequelize } = require('sequelize')
const BooksModel = require('./models/book')
const AuthorsModel = require('./models/author')
const GenresModel = require('./models/genre')
const seed = require('./models/seed/seed_db')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

// Initialize Sequelize
const sequelize = new Sequelize('test_db', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql'
})

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

// Define models
const Book = BooksModel(sequelize)
const Author = AuthorsModel(sequelize)
const Genre = GenresModel(sequelize)

Book.belongsTo(Author, {as: 'Author', foreignKey: 'author_id'});
Book.belongsTo(Genre, {as: 'Genre', foreignKey: 'genre_id'});

// Sync models
sequelize.sync(
    {force: true})
  .then(() => {
    seed.insert(Book, Author, Genre);
    console.log('Models synchronized successfully.')
  })
  .catch(err => {
    console.error('Error synchronizing models:', err)
  })

// Import routes
const booksRoutes = require('./routes/book')
app.use('/books', booksRoutes(Book))

const authorsRoutes = require('./routes/author')
app.use('/authors', authorsRoutes(Author))

const genresRoutes = require('./routes/genre')
app.use('/genres', genresRoutes(Genre))

app.get('/', (req, res) => {
  res.send('Welcome to the Bookstore Capstone!')
})
  
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
