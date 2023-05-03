//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Favorites=require("./models/Favorites")
const Ratings=require("./models/Ratings")

const Comments = require('./models/Comments')

const Restroom = require('./models/Restroom')

//associations could go here!
User.belongsToMany(Restroom, { through: Favorites });
Restroom.belongsToMany(User, { through: Favorites });

Restroom.hasMany(Ratings)
Ratings.belongsTo(Restroom)

User.hasMany(Ratings)
Ratings.belongsTo(User)

User.hasMany(Comments, { foreignKey: 'userId' });
Comments.belongsTo(User, { foreignKey: 'userId' });

Reviews.hasMany(Comments, { foreignKey: 'reviewId' });
Comments.belongsTo(Reviews, { foreignKey: 'reviewId' });

Comments.hasMany(Comments, { foreignKey: 'parentCommentId' });
Comments.belongsTo(Comments, { foreignKey: 'parentCommentId' });



module.exports = {
  db,
  models: {
    User,
    Favorites,
    Ratings,
    Comments,
    Review,
    Restroom,
  },
}
