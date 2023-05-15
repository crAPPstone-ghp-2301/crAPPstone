const router = require('express').Router()
const { models: { Comments, User, Review } } = require('../db')
module.exports = router

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

//Routes to include comments for a single review below 
//fetch all comments for a single reviewId
router.get('/:reviewId/comments', async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.reviewId, {
      include: {
        model: Comments,
        include: [
          {
            model: Comments,
            as: 'replies',
          },
          {
            model: User,
            attributes: ['id', 'username']
          }
        ],
      },
    });
    res.json(review.comments);
  } catch (error) {
    next(error);
  }
});

//fetch a single comment of a reviewId and its replies 
router.get('/:reviewId/comments/:commentId', async (req, res, next) => {
  try {
    const comment = await Comments.findByPk(req.params.commentId, {
      include: {
        model: Comments,
        as: 'replies',
      },
    });
    res.json(comment);
  } catch (error) {
    next(error);
  }
});

//create a new comment for a review 
router.post('/:reviewId/comments', async (req, res, next) => {
  try {
    const { content } = req.body;
    const review = await Review.findByPk(req.params.reviewId);
    let userId = null;

    // this will check if user is logged in and will pull userId
    if (req.headers.authorization) {
      const user = await User.findByToken(req.headers.authorization);
      userId = user.dataValues.id;
    }

    const comment = await review.createComment({
      content,
      userId,
    });

    res.json(comment);
  } catch (error) {
    next(error);
  }
});

//update a comment for a review
router.put('/:reviewId/comments/:commentId', async (req, res, next) => {
  try {
    
    const { content, likes } = req.body;
    const comment = await Comments.findByPk(req.params.commentId);
    await comment.update({ content, likes });
    res.json(comment);
  } catch (error) {
    next(error);
  }
});

//delete a comment for a review
router.delete('/:reviewId/comments/:commentId', async (req, res, next) => {
  try {
    const comment = await Comments.findByPk(req.params.commentId);
    await comment.destroy();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

//routes pertaining to replies to parentCommentId
// create a new reply of a parentCommentId
router.post('/:reviewId/comments/:commentId/replies', async (req, res, next) => {
  try {
    const { content, userId, reviewId } = req.body;
    const parentComment = await Comments.findByPk(req.params.commentId);
    const reply = await Comments.create({ content, userId, reviewId });
    await reply.setParentComment(parentComment);
    res.json(reply);
  } catch (error) {
    next(error);
  }
});

//update a reply of parentCommentId
router.put('/:reviewId/comments/:parentCommentId/replies/:commentId', async (req, res, next) => {
  try {
    const { content, likes } = req.body;
    const reply = await Comments.findOne({
      where: { id: req.params.commentId, parentCommentId: req.params.parentCommentId }
    });

    if (!reply) {
      throw new Error('Reply not found');
    }
    await reply.update({ content, likes });

    res.json(reply);
  } catch (error) {
    next(error);
  }
});


//delete an existing reply for a comment
router.delete('/:reviewId/comments/:parentCommentId/replies/:commentId', async (req, res, next) => {
  try {
    const reply = await Comments.findByPk(req.params.commentId);
    await reply.destroy();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});