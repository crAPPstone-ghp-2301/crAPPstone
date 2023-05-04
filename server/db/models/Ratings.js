const Sequelize = require('sequelize')
const db = require('../db')

const Ratings=db.define("ratings", {
    userId:{
        type: Sequelize.INTEGER,
      },
    
      restroomId: {
        type: Sequelize.INTEGER,
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