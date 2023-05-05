import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllComments, selectCommentsByReviewId } from "./commentsSlice";
import AddComment from "./AddComment";
import AddReply from "./AddReply";

/*
goal here is to have a
- list of all the comments for the same reviewId, 
- ability to add a comment to review, and 
- ability to add a reply to existing "parent" comment

TODO 
- import updateComment, deleteComment thunk 
- add like button 
- add edit button 
- add delete button
- rewrite in proper typescript
*/


const Comments = ({ reviewId }) => {
  const dispatch = useDispatch();
  const comments = useSelector(selectCommentsByReviewId(reviewId));

  const [showAddComment, setShowAddComment] = useState(false);
  const [showAddReply, setShowAddReply] = useState(false);
  const [parentCommentId, setParentCommentId] = useState(null);

  useEffect(() => {
    dispatch(fetchAllComments());
  }, [dispatch]);

  // to handle adding comment to review
  const handleAddComment = () => {
    setShowAddComment(true);
    setParentCommentId(null);
  };

  // to handle replying to existing comment
  const handleAddReply = (commentId) => {
    setShowAddReply(true);
    setParentCommentId(commentId);
  };

  return (
    <div className="comments">
      {comments.map((comment) => (
        <div key={comment.id} className="comment">
          <p>{comment.content}</p>
          <button onClick={() => handleAddReply(comment.id)}>Reply</button>
        </div>
      ))}
      <button onClick={handleAddComment}>Add Comment</button>
      {showAddComment && (
        <AddComment
          reviewId={reviewId}
          onClose={() => setShowAddComment(false)}
        />
      )}

      {showAddReply && (
        <AddReply
          parentCommentId={parentCommentId}
          onClose={() => setShowAddReply(false)}
        />
      )}
    </div>
  );
};

export default Comments;