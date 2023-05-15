const Sequelize = require('sequelize')
const db = require('../db')
// const Restroom = require('./Restroom')

const Ratings=db.define("ratings", {
    userId:{
        type: Sequelize.INTEGER,
      },
    
      restroomId: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: Restroom,
        //   key: 'id'
        // },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      userRating:{
        type: Sequelize.FLOAT,
      },
      isClean:{
        type:Sequelize.BOOLEAN,
      },
     
      // userRatingTotal:{
      //   type:Sequelize.INTEGER
      // }

    
})

module.exports=Ratings