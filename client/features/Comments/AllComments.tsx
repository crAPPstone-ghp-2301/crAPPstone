import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchAllComments, deleteComment } from "./commentsSlice";
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
import { SecondaryButton, TertiaryButton } from "../styles/StyleGuide";

const AllComments = () => {
  const dispatch = useDispatch();
  const { reviewId } = useParams();
  const comments = useSelector((state) => state.comments.allComments);
  const [showAddComment, setShowAddComment] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const userId = useSelector((state) => state.auth.me.id);
  const currentUser = useSelector((state) => state.auth.user);


  
  useEffect(() => {
    dispatch(fetchAllComments(reviewId));
  }, [dispatch, reviewId]);

  const handleWriteComment = () => {
    setShowAddComment(!showAddComment);
  };

  const handleDeleteConfirmation = () => {
    setShowConfirmation(true);
  };

  const handleDeleteComment = (commentId) => {
    setShowConfirmation(false);
    dispatch(deleteComment({ commentId })).then(() => {
      dispatch(fetchAllComments(reviewId));
    });
  };

  const isCurrentUserPostOwner = (comments) => {
    let token = localStorage.getItem("token");
    if (token) {
      return comments.userId === userId;
    }
    return false;
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
        <Box style={{ paddingTop: "10px" }}>
          {comments.map((comment) => (
            <Box key={comment.id}>
              <Box sx={{paddingTop: "10px"}}>
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
              </Box>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ marginLeft: "auto" }}>
                  <LikeButton
                    commentId={comment.id}
                    likes={comment.likes}
                    reviewId={reviewId}
                  />
                </Box>
              </Box>
              {isCurrentUserPostOwner(comment) && (
                <Box sx={{ display: "flex" }}>
                  <Box sx={{ marginLeft: "auto" }}>
                    {showConfirmation ? (
                      <>
                        <TertiaryButton
                          onClick={() =>
                            handleDeleteComment(
                              comment.id
                            )
                          }
                        >
                          Yes
                        </TertiaryButton>
                        <TertiaryButton
                          onClick={() => setShowConfirmation(false)}
                        >
                          No
                        </TertiaryButton>
                      </>
                    ) : (
                      <TertiaryButton onClick={handleDeleteConfirmation}>
                        Delete
                      </TertiaryButton>
                    )}
                  </Box>
                </Box>
              )}
              <Divider />
            </Box>
          ))}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AllComments;
