const Sequelize = require("sequelize");
const db = require("../db");

const Restroom = db.define("restroom", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  openingHours: {
    allowNull: false,
    type: Sequelize.TEXT,
  },
  description: {
    type: Sequelize.TEXT,
  },
  address: {
    allowNull: false,
    type: Sequelize.TEXT,
  },
  placeType: {
    allowNull: false,
    type: Sequelize.TEXT,
  },
  latitude: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  longitude: {
    type: Sequelize.FLOAT,
    allowNull: false,
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
