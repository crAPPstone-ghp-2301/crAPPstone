const router = require('express').Router()
const { models: { Comments, User, Review, Restroom } } = require('../db')

//fetch all reviews of restroomId
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
        },
        {
          model: Comments, // Include the Comments model
          attributes: ['id', 'content'] // Adjust the attributes as needed
        }
      ]
    });

    const reviewsWithUsernameAndComments = reviews.map(review => {
      const username = review.user ? review.user.username : 'Anonymous';
      const comments = review.comments.map(comment => ({
        id: comment.id,
        content: comment.content
      }));
      return {
        ...review.toJSON(),
        username,
        comments
      };
    });

    res.json(reviewsWithUsernameAndComments);
  } catch (error) {
    next(error);
  }
});


//fetch a single review of restroomId
router.get('/:restroomId/reviews/:reviewId', async (req, res, next) => {
  try {
    const singleReview = await Review.findOne({
      where: {
        id: req.params.reviewId, 
        restroomId: req.params.restroomId
      },
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    });

    if (singleReview) {
      res.json(singleReview);
    } else {
      res.status(404).send('Review not found'); 
    }
  } catch (error) { 
    next(error);
  }
});


//create a new review of restroomId
router.patch('/:restroomId/reviews', async (req, res, next) => {
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
      restroomId: req.params.restroomId,
    });

    res.json(review);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.delete("/:restroomId/reviews/:reviewId", async (req, res, next) => {
  try {
    console.log(req.params.restroomId); 
    console.log(req.params.reviewId); 

    const reviewToDelete = await Review.findByPk(req.params.reviewId);
    await reviewToDelete.destroy();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});


module.exports = router
