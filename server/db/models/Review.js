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
  review: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  report_status: {
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
  total_ratings: {
    type: Sequelize.NUMBER,
    defaultValue: null
  },
})

module.exports = Review
