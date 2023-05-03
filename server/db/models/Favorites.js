const Sequelize = require('sequelize')
const db = require('../db')

const Favorites=db.define("favorites", {
    users_id:{
        type: Sequelize.INTEGER,
      },
    
      restrooms_id: {
        type: Sequelize.INTEGER,
      },
    
})
  

module.exports=Favorites