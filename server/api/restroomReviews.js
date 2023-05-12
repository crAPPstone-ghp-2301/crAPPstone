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

//create a new review of restroomId
router.post('/:restroomId/reviews', async (req, res, next) => {
  try {
    const { imageURL, reviewText, reportStatus } = req.body;
    const restroom = await Restroom.findByPk(req.params.restroomId);
    let userId = null;

    if (req.headers.authorization) {
      const user = await User.findByToken(req.headers.authorization);
      userId = user.dataValues.id;
    }

    const review = await restroom.createReview({
      imageURL,
      reviewText,
      reportStatus,
      userId,
    });

    res.json(review);
  } catch (error) {
    next(error);
  }
});

  