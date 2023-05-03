const Sequelize = require('sequelize');
const db = require('../db')

const Comments = db.define('comments', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    parentCommentId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,

    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    reviewId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    comment: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
    likes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
    }
});

module.exports = Comments;
