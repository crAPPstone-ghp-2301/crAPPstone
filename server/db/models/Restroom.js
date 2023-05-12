const Sequelize = require("sequelize");
const db = require("../db");

const Restroom = db.define("restroom", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  openingHours: {
    allowNull: true,
    type: Sequelize.TEXT,
  },
  description: {
    type: Sequelize.TEXT,
  },
  city: {
    allowNull: true,
    type: Sequelize.TEXT,
  },
  location: {
    allowNull: true,
    type: Sequelize.TEXT,
  },
  latitude: {
    type: Sequelize.FLOAT,
    allowNull: true,
  },
  longitude: {
    type: Sequelize.FLOAT,
    allowNull: true,
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
