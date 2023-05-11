const router = require('express').Router()
const { models: { Comments, User, Review, Restroom } } = require('../db')
module.exports = router

//fetch all reviews of a restroomId
router.get('/:restroomId/reviews', async (req, res, next) => {
    try {
        const reviews = await Review.findAll({
            where: {
                restroomId: req.params.restroomId
            },
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });
        res.json(reviews);
    } catch (error) {
        next(error);
    }
});

// router.patch('/:restroomId/reviews/:reviewId', async (req, res, next) => {
//     try {
//       const { imageURL, reviewText, reportStatus, userId } = req.body;
  
//       const [review, created] = await Review.findOrCreate({
//         where: { id: req.params.reviewId },
//         defaults: { imageURL, reviewText, reportStatus }
//       });
  
//       if (!created) {
//         await review.update({ imageURL, reviewText, reportStatus });
//       }
  
//       res.json(review);
//     } catch (error) {
//       next(error)
//     }
// });
  
router.post('/:restroomId/reviews', async (req, res, next) => {
    try {
      const { imageURL, reviewText, reportStatus, userId } = req.body;
      const restroom = await Restroom.findByPk(req.params.restroomId);
      const review = await restroom.createReview({ imageURL, reviewText, reportStatus, userId });
      res.json(review);
    } catch (error) {
      next(error);
    }
  });
  