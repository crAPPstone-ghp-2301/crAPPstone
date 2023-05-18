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
import { SecondaryButton } from "../styles/StyleGuide";


const AllComments = () => {
  const dispatch = useDispatch();
  const { reviewId } = useParams();
  const comments = useSelector((state) => state.comments.allComments);
  const [showAddComment, setShowAddComment] = useState(false);


  useEffect(() => {
    dispatch(fetchAllComments(reviewId));
  }, [dispatch, reviewId]);

    const handleWriteComment = () => {
    setShowAddComment(!showAddComment);
  };


  return (
    <ThemeProvider theme={crAppTheme}>
      <CssBaseline />
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!showAddComment ? (
            <SecondaryButton onClick={handleWriteComment}>
              <Typography variant="subtitle1">Write a Comment</Typography>
            </SecondaryButton>
          ) : (
            <AddComment reviewId={reviewId} />
          )}
        </Box>
        <Box
          style={{ height: "310px", overflowY: "scroll", paddingRight: "20px" }}
        >
          {comments.map((comment) => (
            <Box key={comment.id}>
              <Box>
                {comment.user ? (
                  <Typography variant="h5" color="secondary.dark">
                    {comment.user.username}
                  </Typography>
                ) : (
                  <Typography variant="h5" color="secondary.dark">
                    Anonymous
                  </Typography>
                )}
              </Box>
              <Box>
                <Typography variant="subtitle1" color="secondary.light">
                  {comment.content}
                </Typography>
                <LikeButton
                  commentId={comment.id}
                  likes={comment.likes}
                  reviewId={reviewId}
                />
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
