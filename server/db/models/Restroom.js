const Sequelize = require("sequelize");
const db = require("../db");
const Ratings = require("./Ratings")

const Restroom = db.define("restroom", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "https://images.unsplash.com/photo-1569597967185-cd6120712154?ixlib=rb-4.0.3&ixid=MnwxM[…]90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
    validate: {
      isURL: true,
    }
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
  isLocked: {
    type: Sequelize.BOOLEAN,
  },
  code: {
    type: Sequelize.STRING,
  },
  isBusy: {
    type: Sequelize.BOOLEAN
  },
  lastUpdate: {
    type: Sequelize.DATE,
  },
  createdAt: {
    type: Sequelize.DATE,
  }
});

module.exports = Restroom;
