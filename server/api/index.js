const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/reviews', require('./comments'))
router.use('/reviews', require('./reviews'))
router.use ('/restrooms', require('./restrooms'))
router.use("/favorites",require("./favorites"))
router.use("/ratings", require("./ratings"))
router.use("/restrooms", require("./restroomReviews"))
router.use("/saved", require("./saved"))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
