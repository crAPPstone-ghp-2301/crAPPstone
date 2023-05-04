const router = require('express').Router()
const { models: { Review }} = require('../db')
module.exports = router

//get all reviews
router.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.findAll()
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

//get single review id
router.get('/:reviewId', async (req, res, next) => {
  try {
    const singleReview = await Review.findByPk(req.params.reviewId)
    res.json(singleReview)
  } catch (error) { next(error) }
})

//delete single review
router.delete('/:reviewId', async (req, res, next) => {
  try {
    const reviewToDelete = await Review.findByPk(req.params.reviewId)
    await reviewToDelete.destroy()
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

//create or update review
// //change this when you have authentication - possibly something like api route to /api/reviews and then token
router.patch('/:reviewId', async (req, res, next) => {
  try {
    // const currentUser = await User.findByToken(req.headers.authorization);

    const { imageURL, reviewText, reportStatus } = req.body;

    const [review, created] = await Review.findOrCreate({
      // where: { userId: currentUser.id },
      where: { id: req.params.reviewId },
      defaults: { imageURL, reviewText, reportStatus }
    });

    if (!created) {
      await review.update({ imageURL, reviewText, reportStatus });
    }

    res.json(review);
  } catch (error) {
    next(error)
  }
})
