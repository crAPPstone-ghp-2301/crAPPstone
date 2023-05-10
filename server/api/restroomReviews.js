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