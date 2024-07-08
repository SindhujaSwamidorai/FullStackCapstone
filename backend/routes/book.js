const express = require('express')
const router = express.Router()
const { Op, QueryTypes } = require('sequelize');

module.exports = (Book, sequelize) => {

// GET all books
router.get('/', async (req, res) => {
  const params = req.query;
  console.log(params);
  let whereClause = {};
  let sortOrder = [];
  try {
    //console.log('Printing request: ', req);
    if('start' in params) {
        whereClause['title'] = {[Op.like]: `${params.start}%`};
    }

    if('genre_id' in params) {
      whereClause['genre_id'] = params.genre_id;
    }

    if('author_id' in params) {
      whereClause['author_id'] = params.author_id;
    }

    if('title' in params) {
      whereClause['title'] = {[Op.like]: `%${params.title}%`};
    }

    if(('sort' in params) && ('order' in params)) {
      sortOrder.push([params.sort, params.order]);
    }

    if ('author_name' in params) {
      whereClause['author_id'] = {[Op.in]: sequelize.literal( `(SELECT author_id FROM Authors WHERE name LIKE '%${params.author_name}%' )`)};
    }
    console.log(whereClause.length);
    sortOrder.push(['title', 'ASC']);

    if(Object.keys(whereClause).length > 0){
    const books = await Book.findAll({
          where: whereClause,
          order: sortOrder,
          limit: params.limit? parseInt(params.limit): 100
        })
        res.json(books)
      }
    else {
      const books = await Book.findAll({
        order: sortOrder,
        limit: params.limit? parseInt(params.limit): 100
      }) 
      res.json(books)     
    }

  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET a single book by ID
router.get('/:book_id', async (req, res) => {
  try {
    const sql =  `SELECT * FROM Books JOIN Authors JOIN Genres ON Books.author_id=Authors.author_id 
                  AND Books.genre_id=Genres.genre_id WHERE book_id=?`;
    const values=[req.params.book_id];

    const books = await sequelize.query(sql,{
      replacements: values,
      type: QueryTypes.SELECT,
    });
    if (books.length > 0) {
      res.json(books[0])
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
