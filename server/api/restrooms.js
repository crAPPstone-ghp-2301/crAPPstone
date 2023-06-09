const router = require('express').Router();
const { models: { User, Restroom } } = require('../db')

// middleware function to check if user isAdmin
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (!user.isAdmin) {
      const error = new Error('Not authorized');
      error.status = 401;
      throw error;
    }
    next();
  } catch (err) {
    next(err);
  }
};

// middleware function to check if user is the same user or isAdmin
const isUserOrAdmin = async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    if (!user.isAdmin && user.id !== Number(req.params.id)) {
      const error = new Error('Not authorized');
      error.status = 401;
      throw error;
    }
    next();
  } catch (err) {
    next(err);
  }
};


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

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, imageURL, description, openingHours } = req.body;

    // Check if the restroom with the given ID exists
    const existingRestroom = await Restroom.findByPk(id);

    if (existingRestroom) {
      // If the restroom exists, update its properties
      await existingRestroom.update({
        name,
        imageURL,
        description,
        openingHours,
      });
      res.sendStatus(200);
    } else {
      // If the restroom doesn't exist, create a new one
      await Restroom.create({
        id,
        name,
        imageURL,
        description,
        openingHours,
      });
      res.sendStatus(201);
    }
  } catch (error) {
    next(error);
  }
});




module.exports = router;