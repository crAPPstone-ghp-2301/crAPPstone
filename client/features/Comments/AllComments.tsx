import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
// import { fetchAllComments } from "../review/reviewSlice";
import { fetchAllComments } from "./commentsSlice";
import AddComment from "./AddComment";

/* will delete when finished
goal here is to have a
- display list of all the comments for the same reviewId (x)
- style with MUI ()

seconday goal is to have a
- delete button to delete the comment ()
- edit button to edit the comment ()


brain dump
a restroom has many reviews 
a review has an imageUrl, reportStatus, reviewText.
a review can have many comments of that reviewId, and each comment can have many replies.
we want this comment list to be a list of comments of that reviewId, and each comment can have many replies with the same parentCommentId.

Review.hasMany(Comments);
Comments.belongsTo(Review);

Review.belongsTo(User);
User.hasMany(Review);

Review.belongsTo(Restroom);
Restroom.hasMany(Review);

User.hasMany(Comments, { foreignKey: 'userId' });
Comments.belongsTo(User, { foreignKey: 'userId' });

Comments.hasMany(Comments, { as: 'replies', foreignKey: 'parentCommentId' });
Comments.belongsTo(Comments, { as: 'parentComment', foreignKey: 'parentCommentId' });

*/

const AllComments = () => {
  const dispatch = useDispatch();
  const { reviewId } = useParams();
  const [showAddComment, setShowAddComment] = useState(false);
  const comments = useSelector((state) => state.comments.allComments);

  useEffect(() => {
    dispatch(fetchAllComments(reviewId));
  }, [dispatch, reviewId]);

  const handleAddComment = () => {
    setShowAddComment(!showAddComment);
  };

  return (
    <div className="testing">
      {showAddComment ? (
        <AddComment reviewId={reviewId} />
      ) : (
        <button onClick={handleAddComment}>Add Comment</button>
      )}
  
      <div style={{ height: "270px", overflowY: "scroll" }}>
        <h3>Comments</h3>
        {comments.map((comment) => (
          <div key={comment.id} >
            <div>
              {comment.user ? <p>{comment.user.username}</p> : <p>Anonymous</p>}
            </div>
            <div>
              <p>{comment.content}</p>
              <p>Likes: {comment.likes}</p>
              {/* like button increment component here */}
              {/* reply button component here when it works */}
            </div>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllComments;
