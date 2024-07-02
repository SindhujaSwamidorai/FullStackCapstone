const express = require('express')
const router = express.Router()

module.exports = (Book) => {

// GET all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.findAll()
    res.json(books)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET a single book by ID
router.get('/:book_id', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.book_id)
    if (book) {
      res.json(book)
    } else {
      res.status(404).json({ error: 'Book with given details not found' })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Edit a book
router.put('/:book_id', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.book_id);
    if (book){
      if('price' in req.body) {
        book.price = req.body.price;
        book.save();
        res.json(book);
      }
      else {
        res.status(406).json({ error: 'Invalid parameters' })
      }
    } else {
      res.status(404).json({ error: 'Book with given details not found' })
    }
  }
  catch(err) {
    res.status(500).json({ error: err.message })
  }
})


router.post('/', async (req, res) => {
  try {
      const book = await Book.create(req.body);
      res.status(201).json(book);
      //console.log(JSON.stringify(req.body));
  }
  catch (err) {
      res.status(500).json({ error: err.message })
      console.log('error: ', err.message);
  }
})

// DELETE a book by ID
router.delete('/:book_id', async (req, res) => {
  try {
    const deleted = await Book.destroy({
      where: { book_id: req.params.book_id }
    })
    if (deleted) {
      res.status(204).end()
    } else {
      res.status(404).json({ error: 'Book with given details not found' })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

//module.exports = router
return router;
}
