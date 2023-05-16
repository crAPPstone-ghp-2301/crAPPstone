const router = require('express').Router()
//route for saved restrooms
const { models: { Favorites, User, Restroom }} = require('../db')

router.get('/', async (req, res, next) => {
  try {
    const currentUser = await User.findByToken(req.headers.authorization)
    const savedRestrooms = await Favorites.findAll({
      where: {
        userId: currentUser.id
      }
    })
    res.json(savedRestrooms)
  } catch (error) {
    next(error)
  }
})

router.delete("/:restroomId", async (req, res, next) => {
  try {
    const currentUser = await User.findByToken(req.headers.authorization)
    const favoriteToDelete = await Favorites.findOne({
      where: {
        restroomId: req.params.restroomId,
        userId: currentUser.id
      }
    });
    if (!favoriteToDelete) {
      return res.status(404).json({ error: "Favorite not found" });
    }
    await favoriteToDelete.destroy();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const currentUser = await User.findByToken(req.headers.authorization)
    const response = await Favorites.findOrCreate({
      where: {
        restroomId : req.body.restroomId,
        userId: currentUser.id
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
