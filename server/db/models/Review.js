const Sequelize = require('sequelize')
const db = require('../db')

//association with restroom and user
//restroom has many reviews
//review belongs to one restroom
//user has many reviews
//reviews belongs to one restroom

const Review = db.define('review', {
  imageUrl: {
    type: Sequelize.STRING,
  },
  reviewText: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  reportStatus: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  rating: {
    type: Sequelize.NUMBER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  totalRatings: {
    type: Sequelize.NUMBER,
    defaultValue: null
  },
})

module.exports = Review
