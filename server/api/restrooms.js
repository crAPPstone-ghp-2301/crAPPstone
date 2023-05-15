const router = require('express').Router();
const { models: { User, Restroom } } = require('../db')

router.get('/', async (req, res, next) => {
  console.log("Restroom backend API is running")
  try {
    const restrooms = await Restroom.findAll();
    res.json(restrooms)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    console.log("SINGLE Restroom BACKEND WORKING")
    const singleRestroom = await Restroom.findByPk(req.params.id);
    res.json(singleRestroom);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  console.log(req.body)
  try {
    const response = await Restroom.create(req.body);
    res.json(response);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const response = await Restroom.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const response = await Restroom.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (err) {
    next(err);
  }
});

module.exports = router;