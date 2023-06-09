const router = require('express').Router();
const { models: { User, Restroom,  Ratings,  } } = require("../db/index")

//get ratings made by user
// router.get('/:userId', async (req, res) => {
//   try {
//     const user = await User.findByPk(req.params.userId);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const rate = await Ratings.findAll({
//       where: { userId: user.id }
//     });

//     return res.status(200).json(rate);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Server error' });
//   }
// });

//get restroom rating 
router.get('/:restroomId', async (req, res) => {
  try {
    const restroomId = req.params.restroomId;
    const target = await Ratings.findAll({
      where: { restroomId: restroomId }
    });
    return res.status(200).json(target);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

//user add the rating 
router.post('/', async (req, res, next) => {
  try {
    const newRating = await Ratings.create(req.body)
    res.json(newRating)
  } catch (err) {
    res.send(err)
  }
})

//user remove rating 
router.delete('/:id', async (req, res, next) => {
  try {
    const deleteed = await Ratings.destroy({ where: { id } })
    res.sendStatus(204)
  }
  catch (error) {
    next(error)
  }
})

//user update the rating 
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId, restroomId, userRating, isClean } = req.body;
    const ratingToUpdate = await Ratings.findOne({ where: { id } });

    if (!ratingToUpdate) {
      return res.status(404).json({ error: 'Rating not found' });
    }

    await ratingToUpdate.update({ userId, restroomId, userRating, isClean });
    res.status(200).json({ message: 'Rating updated successfully' });
  } catch (error) {
    next(error);
  }
});



module.exports = router;