const Sequelize = require('sequelize');
const db = require('../db')

const Comments = db.define('comments', {
    content: {
        type: Sequelize.TEXT,
    },
    likes: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    }
});

//instance method - to save likes to database
Comments.prototype.likeComment = async function() {
    this.likes++;
    await this.save();
};
  
//class methods - not sure if needed for sorting purposes
Comments.findByUser = async function(userId) {
    return await this.findAll({ where: { userId } });
};
  
Comments.findByReview = async function(reviewId) {
    return await this.findAll({ where: { reviewId } });
};

Comments.findMostLiked = async function(limit) {
    return await this.findAll({ order: [['likes', 'DESC']], limit });
};
  

module.exports = Comments;
