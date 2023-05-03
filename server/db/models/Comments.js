const Sequelize = require('sequelize');
const db = require('../db')

const Comments = db.define('comments', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    content: {
        type: Sequelize.TEXT,
    },
    likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    }
});

module.exports = Comments;
