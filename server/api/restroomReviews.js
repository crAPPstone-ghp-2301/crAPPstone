const router = require('express').Router()
const { models: { Comments, User, Review, Restroom } } = require('../db')

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

    const reviewsWithUsername = reviews.map(review => {
      const username = review.user ? review.user.username : 'Anonymous';
      console.log(username);
      return {
        ...review.toJSON(),
        username
      };
    });

    res.json(reviewsWithUsername);
  } catch (error) {
    next(error);
  }
});


//create a new review of restroomId
// router.post('/:restroomId/reviews', async (req, res, next) => {
//   try {
//     const { imageURL, reviewText, reportStatus } = req.body;
//     const restroom = await Restroom.findByPk(req.params.restroomId);
//     let userId = null;

//     if (req.headers.authorization) {
//       const user = await User.findByToken(req.headers.authorization);
//       userId = user.dataValues.id;
//     }

//     const review = await restroom.createReview({
//       imageURL,
//       reviewText,
//       reportStatus,
//       userId,
//     });

//     res.json(review);
//   } catch (error) {
//     console.log(error)
//     next(error);
//   }
// });

router.post('/:restroomId/reviews', async (req, res, next) => {
  try {
    const { imageURL, reviewText, reportStatus } = req.body;
    const restroom = await Restroom.findByPk(req.params.restroomId);
    let userId = null;

    if (req.headers.authorization) {
      const user = await User.findByToken(req.headers.authorization);
      userId = user.dataValues.id;
    }

    const review = await Review.create({
      imageURL,
      reviewText,
      reportStatus,
      userId,
      RestroomId: req.params.restroomId, 
    });

    res.json(review);
  } catch (error) {
    console.log(error);
    next(error);
  }
});



module.exports = router
