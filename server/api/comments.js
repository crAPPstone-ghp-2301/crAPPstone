const router = require('express').Router()
const { models: { Comments, User, Review } } = require('../db')
module.exports = router

//fetching all comments - WORKS
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

//fetching a single comment - WORKS
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
    console.log("data", req.body)

      res.json(comment);
    } else {
      res.status(404).json({ error: 'Comment not found!' });
    }

  } catch (err) {
    next(err);
  }
});

//combined put routes for likes and content without using instance method - WORKS
router.put('/:id', async (req, res, next) => {
  try {
    const comment = await Comments.findByPk(req.params.id);

    if (comment) {
      const { content, likes } = req.body;
      await comment.update({ content, likes });
      res.json(comment);
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }

  } catch (err) {
    next(err);
  }
});

//delete comments - WORKS
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

//create new comments within review - WORKS
router.post("/", async (req, res, next) => {
  try {
    const comment = await Comments.create(req.body);
    console.log(req.body)
    res.json(comment);
  } catch (error) {
    next(error);
  }
});

