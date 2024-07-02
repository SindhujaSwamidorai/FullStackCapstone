const express = require('express')
const router = express.Router()

module.exports = (Genre) => {

// GET all Genres
router.get('/', async (req, res) => {
  try {
    const genres = await Genre.findAll()
    res.json(genres)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET a single Genre by ID
router.get('/:genre_id', async (req, res) => {
  try {
    const genre = await Genre.findByPk(req.params.genre_id)
    if (genre) {
      res.json(genre)
    } else {
      res.status(404).json({ error: 'Genre not found' })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})


router.post('/', async (req, res) => {
    try {
        const genre = await Genre.create(req.body);
        res.status(201).json(genre);
        //console.log(JSON.stringify(req.body));
    }
    catch (err) {
        res.status(500).json({ error: err.message })
        console.log('error: ', err.message);
    }
})

// DELETE a Genre by ID
router.delete('/', async (req, res) => {
    res.status(405).json({ error: 'Deletion of genre not allowed' })
})


// DELETE a Genre by ID
router.delete('/:genre_id', async (req, res) => {
    res.status(405).json({ error: 'Deletion of genre not allowed' })
})

//module.exports = router
return router;
}
