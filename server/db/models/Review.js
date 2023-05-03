const { REAL } = require('sequelize');
const Sequelize = require('sequelize')
const db = require('../db')

//association with restroom and user
//restroom has many reviews
//review belongs to one restroom
//user has many reviews
//reviews belongs to one restroom

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
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    },
    //------------------ideally a hook to add to totalratings every time rating is added, going to keep this for now but will see how it works--------------
    set(value) {
      this.setDataValue('rating', value);
      if (this.totalRatings === null) {
        this.setDataValue('totalRatings', 1);
      } else {
        this.setDataValue('totalRatings', this.totalRatings + 1);
      }
    },
    //-----------------------------------------------------------------------otherwise can delete-----------------------------------------------------------
  },
  totalRatings: {
    type: Sequelize.INTEGER,
    defaultValue: null
  },
})

module.exports = Review
