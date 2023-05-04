//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Favorites = require("./models/Favorites")
const Ratings = require("./models/Ratings")
const Review = require('./models/Review')
const Comments = require('./models/Comments')
const Restroom = require('./models/Restroom')

//associations could go here!
User.belongsToMany(Restroom, { through: Favorites });
Restroom.belongsToMany(User, { through: Favorites });

Restroom.hasMany(Ratings)
Ratings.belongsTo(Restroom)

User.hasMany(Ratings)
Ratings.belongsTo(User)
Review.hasMany(Comments);
Comments.belongsTo(Review);

Review.belongsTo(User);
User.hasMany(Review);

Review.belongsTo(Restroom);
Restroom.hasMany(Review);

// Comments.hasMany(Comments, { foreignKey: 'parentCommentId', allowNull: true });
// Comments.belongsTo(Comments, { foreignKey: 'parentCommentId'});

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
