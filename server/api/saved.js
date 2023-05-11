const router = require('express').Router()
//route for saved restrooms
const { models: { Favorites, User, Restroom }} = require('../db')

router.get('/', async (req, res, next) => {
  try {
    const saved = await Favorites.findAll()
    res.json(saved)
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
    const response = await Favorites.create(req.body)
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
