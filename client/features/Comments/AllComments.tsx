import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchAllComments } from "./commentsSlice";
import AddComment from "./AddComment";
import LikeButton from "./LikeButton";
import { Box, Button, Divider, Typography } from "@mui/material";
import { PrimaryButton } from "../styles/StyleGuide";

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
  const comments = useSelector((state) => state.comments.allComments);

  useEffect(() => {
    dispatch(fetchAllComments(reviewId));
  }, [dispatch, reviewId]);

  return (
    <Box paddingLeft="35%">
      <Box paddingRight="20%">
        <AddComment reviewId={reviewId} />
      </Box>
      <Box style={{ height: "310px", overflowY: "scroll", paddingRight:"20px", }}>
        <h3>Comments</h3>
        {comments.map((comment) => (
          <Box key={comment.id}>
            <Box>
              {comment.user ? (
                <Typography>{comment.user.username}</Typography>
              ) : (
                <Typography>Anonymous</Typography>
              )}
            </Box>
            <Box>
              <Typography variant="subtitle2">{comment.content}</Typography>
              <LikeButton commentId={comment.id} likes={comment.likes} />
              {/* reply button component here when it works */}
            </Box>
            <Divider />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AllComments;
