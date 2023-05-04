const router = require('express').Router()
const { models: { Comments, User, Review } } = require('../db')
module.exports = router

//fetching all comments
router.get('/', async (req, res, next) => {
  try {
    const comments = await Comments.findAll({
      include: [
        { model: User },
        { model: Review },
        { model: Comments, as: 'replies' },
        { model: Comments, as: 'parentComment' }
      ]
    });
    res.json(comments);
  } catch (err) {
    next(err);
  }
});

//fetching a single comment
router.get('/:id', async (req, res, next) => {
  try {
    const comment = await Comments.findByPk(req.params.id, {
      include: [
        { model: User },
        { model: Review },
        { model: Comments, as: 'replies' },
        { model: Comments, as: 'parentComment' }
      ]
    });

    if (comment) {
      res.json(comment);
    } else {
      res.status(404).json({ error: 'Comment not found!' });
    }

  } catch (err) {
    next(err);
  }
});

//creating new comment
router.post('/', async (req, res, next) => {
  try {
    const { content, userId, reviewId, parentCommentId } = req.body;

    // here, we are checking if the parent comment exists 
    if (parentCommentId) {
      const parentComment = await Comments.findByPk(parentCommentId);
      if (!parentComment) {
        res.status(404).json({ error: 'Parent comment not found' });
        return;
      }
    }

    const comment = await Comments.create({ content, userId, reviewId, parentCommentId });
    res.status(201).json(comment);

  } catch (err) {
    next(err);
  }
});

//update comment
router.put('/:id', async (req, res, next) => {
  try {
    const comment = await Comments.findByPk(req.params.id);

    if (comment) {
      await comment.update(req.body);
      res.json(comment);
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }

  } catch (err) {
    next(err);
  }
});

//update likes in a comment using the instance method in Comments model
router.put('/:id/like', async (req, res, next) => {
  try {
    const comment = await Comments.findByPk(req.params.id);

    if (comment) {
      await comment.likeComment();
      res.json(comment);
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }

  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const comment = await Comments.findByPk(req.params.id);

    if (comment) {
      await comment.destroy();
      res.status(204).json({ message: 'Comment deleted' });
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }

  } catch (err) {
    next(err);
  }
});

