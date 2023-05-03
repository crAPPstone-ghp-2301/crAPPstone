//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')

const Comments = require('./models/Comments')

const Restroom = require('./models/Restroom')

//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Comments,
    Review,
    Restroom,
  },
}
