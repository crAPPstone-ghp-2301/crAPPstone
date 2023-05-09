import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleComment, fetchAllComments } from "./commentsSlice"
import AddReply from "./AddReply";

/* goal here is to display a single comment
primary display goal
- comment's content (x)
- comment's likes (x)
- like button / dislike button
- add reply button that will show the AddReply form when clicked on

seconday goal
- edit button if user is logged in and comment belongs to current user
- delete button if user is logged in and comment belongs to current user
*/

const SingleComment = () => {
    const dispatch = useDispatch();
    const { reviewId, commentId } = useParams();
  
    useEffect(() => {
      dispatch(fetchSingleComment({ reviewId, commentId }));
    }, [dispatch, reviewId, commentId]);
  
    const { content, likes } = useSelector((state) => state.comments.singleComment);
  
    return (
      <div className="testing">
        <h2>Comment</h2>
        <p>{content}</p>
        <p>Likes: {likes}</p>
        <AddReply reviewId={reviewId} commentId={commentId} />
      </div>
    );
};
  
export default SingleComment;
  