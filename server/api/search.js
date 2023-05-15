const router = require('express').Router();
const { models: { Restroom } } = require("../db/index")

router.get('/', async (req, res, next) => {
    const { name } = req.query;
  
    try {
      const target = await Restroom.findAll({ where: { name: name } });
      res.json(target);
    } catch (err) {
      next(err);
    }
  });
  

  module.exports = router