const router = require('express').Router()
//route for saved restrooms
const { models: { Favorites }} = require('../db')

router.get('/', async (req, res, next) => {
  try {
    const saved = await Favorites.findAll()
    res.json(saved)
  } catch (err) {
    next(err)
  }
})

module.exports = router
