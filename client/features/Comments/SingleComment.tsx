import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateComment, fetchSingleComment, selectSingleComment } from "./commentsSlice";
import AddReply from "./AddReply";

/* goal here is to display a single comment
primary display goal
- comment's content
- comment's likes
- like button / dislike button
- add reply button that will show the AddReply form when clicked on

seconday goal
- edit button if user is logged in and comment belongs to current user
- delete button if user is logged in and comment belongs to current user
*/

//not working yet - work in progress since id is still undefined 

const SingleComment = ({ commentId }) => {
  const dispatch = useDispatch();
  const comment = useSelector((state)=> state.comments.singleComment);

  useEffect(() => {
    console.log("commentId ------->", commentId);
    dispatch(fetchSingleComment(commentId));
  }, [dispatch]);

  return (
    <div>
      <p>{comment.likes} likes</p>
      <p>{comment.content}</p>
    </div>
  );
};

export default SingleComment;

