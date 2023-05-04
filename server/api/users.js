const router = require('express').Router()
const { models: { User } } = require('../db')
module.exports = router

// fetch all users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (error) {
    next(error)
  }
})

// fetch single user
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (!user) {
      res.status(404).send("User not found")
    } else {
      res.json(user)
    }
  } catch (error) {
    next(new Error('User not found'));
  }
})

// create new user
router.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.json(user)
  } catch (error) {
    next(error)
  }
})

// update user
router.patch("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    console.log(user)
    if (user) {
      res.json(await user.update(req.body));
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
});

// delete user
router.delete("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;