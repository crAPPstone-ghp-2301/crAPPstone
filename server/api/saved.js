const router = require('express').Router()
//route for saved restrooms
const { models: { Favorites, User, Restroom }} = require('../db')

router.get('/', async (req, res, next) => {
  try {
    const savedRestrooms = await Favorites.findAll()
    console.log('savedrestrooms api', savedRestrooms)
    res.json(savedRestrooms)
  } catch (error) {
    next(error)
  }
})

router.delete("/:restroomId", async (req, res, next) => {
  try {
    console.log('endpoint' ,req.params.restroomId)
    const restroomToDelete = await Favorites.findByPk(req.params.restroomId);
    await restroomToDelete.destroy();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    console.log('req.body for saved.js', req.body)
    const response = await Favorites.findOrCreate({
      where: {
        restroomId : req.body.restroomId,
        // userId: req.headers.authorization
        userId: 1
      }
    })
    res.json(response)
  } catch (error) {
    next(error)
  }
})

router.patch('/:restroomId', async (req, res, next) => {
  try {
    const currentUser = await User.findByToken(req.headers.authorization)
    const [savedRestroom] = await Favorites.findOrCreate({
      where: { userId: currentUser.id, restroomId: req.params.restroomId },
    })
    await savedRestroom.save()
    res.status(201).json(savedRestroom)
  } catch (err) {
    next (err)
  }
})

module.exports = router
