import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllComments, selectCommentsByReviewId } from "./commentsSlice";
import AddComment from "./AddComment";
import SingleComment from "./SingleComment";

/* will delete when finished
goal here is to have a
- display list of all the comments for the same reviewId

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

//need to redo this - import AddComment form as first component that shows up and and map out SingleComment
// const Comments = ({ reviewId }) => {
//   const dispatch = useDispatch();
//   const comments = useSelector(selectCommentsByReviewId(reviewId));

//   const [showAddComment, setShowAddComment] = useState(false);
//   const [showAddReply, setShowAddReply] = useState(false);
//   const [parentCommentId, setParentCommentId] = useState(null);

//   useEffect(() => {
//     dispatch(fetchAllComments());
//     console.log(comments);
//   }, [dispatch]);

//   // to handle adding comment to review
//   const handleAddComment = () => {
//     setShowAddComment(true);
//     setParentCommentId(null);
//   };

//   // to handle replying to existing comment
//   const handleAddReply = (commentId) => {
//     setShowAddReply(true);
//     setParentCommentId(commentId);
//   };

//   return (
//     <div className="comments">

//       {/* {comments.map((comment) => (
//         <div key={comment.id} className="comment">
//           <p>{comment.content}</p>
//           <button onClick={() => handleAddReply(comment.id)}>Reply</button>
//         </div>
//       ))}
//       <button onClick={handleAddComment}>Add Comment</button>
//       {showAddComment && (
//         <AddComment
//           reviewId={reviewId}
//           onClose={() => setShowAddComment(false)}
//         />
//       )}

//       {showAddReply && (
//         <AddReply
//           parentCommentId={parentCommentId}
//           onClose={() => setShowAddReply(false)}
//         />
//       )} */}
//     </div>
//   );
// };

// export default Comments;

const Comments = ({ reviewId }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.allComments);

  useEffect(() => {
    dispatch(fetchAllComments());
  }, [dispatch]);

  return (
    <>
      <div>
        <AddComment />
      </div>
      <div>
        {comments.map((comment) => (
          <SingleComment key={comment.id} />
        ))}
      </div>
    </>
  );
};

export default Comments;
