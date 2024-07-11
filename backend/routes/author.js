const express = require('express')
const router = express.Router()

module.exports = (Author) => {

// GET all authors
router.get('/', async (req, res) => {
  try {
    const authors = await Author.findAll({
      order: [['name', 'ASC']]
    })
    res.json(authors)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET a single author by ID
router.get('/:author_id', async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.author_id)
    if (author) {
      res.json(author)
    } else {
      res.status(404).json({ error: 'Author with given details not found' })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Edit an author
router.put('/:author_id', async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.author_id);
    let save=true;
    if (author){
      Object.keys(req.body).map((key) => {
        switch(key) {
          case 'biography': 
          author.biography = req.body.biography;
          break;
          case 'name':
            author.name = req.body.name;
            break;
            case 'author_id':
              break;
            default:
              save=false; 
              res.status(406).json({ error: 'Invalid parameters' })
        }
      })
      if(save) {
        author.save();
        res.json(author);  
      }
    }
    else {
      res.status(404).json({ error: 'Author with given details not found' })
    }
  }
  catch(err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/', async (req, res) => {
  try {
      const author = await Author.create(req.body);
      res.status(201).json(author);
      //console.log(JSON.stringify(req.body));
  }
  catch (err) {
      res.status(500).json({ error: err.message })
      console.log('error: ', err.message);
  }
})


// DELETE a author by ID
router.delete('/:author_id', async (req, res) => {
  try {
    const deleted = await Author.destroy({
      where: { author_id: req.params.author_id }
    })
    if (deleted) {
      res.status(204).end()
    } else {
      res.status(404).json({ error: 'Author with given details not found' })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

//module.exports = router
return router;
}
