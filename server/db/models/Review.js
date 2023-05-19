const { REAL } = require('sequelize');
const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  imageURL: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  reviewText: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  reportStatus: {
    type: Sequelize.ENUM('None', 'Clean', 'Closed', 'Dirty'),
    defaultValue: 'none',
  },
  restroomId: {
    type: Sequelize.INTEGER
  }
})

module.exports = Review
