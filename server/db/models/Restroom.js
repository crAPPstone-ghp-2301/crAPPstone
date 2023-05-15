const Sequelize = require("sequelize");
const db = require("../db");
const Ratings = require("./Ratings")

const Restroom = db.define("restroom", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
    // references: {
    //   // model: Ratings,
    //   // key: "restroomId"
    // },
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  openingHours: {
    allowNull: true,
    type: Sequelize.TEXT,
  },
  description: {
    type: Sequelize.TEXT,
  },
  address: {
    type: Sequelize.TEXT,
  },
  placeType: {
    type: Sequelize.TEXT,
  },
  latitude: {
    type: Sequelize.FLOAT,
  },
  longitude: {
    type: Sequelize.FLOAT,
  },
  capacity: {
    type: Sequelize.INTEGER,
  },
  isLocked:{
    type: Sequelize.BOOLEAN,
  },
  code:{
    type: Sequelize.STRING,
  },
  isBusy:{
    type: Sequelize.BOOLEAN
  },
  lastUpdate:{
    type: Sequelize.DATE,
  },
  createdAt:{
    type: Sequelize.DATE,
  }
});

module.exports = Restroom;
