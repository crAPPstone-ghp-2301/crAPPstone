import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchAllComments } from "./commentsSlice";
import AddComment from "./AddComment";
import LikeButton from "./LikeButton";
import crAppTheme from "../../app/theme";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { PrimaryButton, TertiaryButton } from "../styles/StyleGuide";

const AllComments = () => {
  const dispatch = useDispatch();
  const { reviewId } = useParams();
  const comments = useSelector((state) => state.comments.allComments);

  useEffect(() => {
    dispatch(fetchAllComments(reviewId));
  }, [dispatch, reviewId]);

  return (
    <ThemeProvider theme={crAppTheme}>
      <CssBaseline />
    <Container>
      <Box>
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
      </Container>
      </ThemeProvider>
  );
};

export default AllComments;
