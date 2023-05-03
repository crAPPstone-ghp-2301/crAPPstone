//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Restroom=require('./models/Restroom')
//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Review,
    Restroom,
  },
}
