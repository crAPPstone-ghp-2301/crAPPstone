const Sequelize = require('sequelize')
const db = require('../db')

const Ratings=db.define("ratings", {
    user_id:{
        type: Sequelize.INTEGER,
      },
    
      restroom_id: {
        type: Sequelize.INTEGER,
      },

      user_rating:{
        type: Sequelize.FLOAT,
      },
      isClean:{
        type:Sequelize.BOOLEAN,
      },
     
      user_ratings_total:{
        type:Sequelize.INTEGER
      }

    
})

module.exports=Ratings