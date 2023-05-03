const router = require('express').Router()
const { models: { Comments, User }} = require('../db')
module.exports = router


//fetch comments of users 
router.get('/', async (req, res, next) => {
  try {
      const comments = await Comments.findAll({
        include: [{ model: User }]
    })
    res.json(comments)
  } catch (err) {
    next(err)
  }
})
