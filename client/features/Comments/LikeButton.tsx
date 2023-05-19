import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateComment } from "./commentsSlice";
import { IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import crAppTheme from "../../app/theme";
import { PrimaryButton } from "../styles/StyleGuide";
import {
  ThemeProvider,
  Typography,
  Grid,
} from "@mui/material";

const LikeButton = ({ commentId, likes, reviewId }) => {
  const dispatch = useDispatch();
  const [currentLikes, setCurrentLikes] = useState(likes);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const storedLikeStatus = localStorage.getItem(`likeStatus_${commentId}`);
    if (storedLikeStatus) {
      setIsLiked(true);
    }
  }, [commentId]);

  const handleLike = () => {
    if (!isLiked) {
      const newLikes = currentLikes + 1;
      dispatch(updateComment({ reviewId, commentId, likes: newLikes }));
      setCurrentLikes(newLikes);
      setIsLiked(true);

      localStorage.setItem(`likeStatus_${commentId}`, 'liked');
    }
  };

  return (
    <ThemeProvider theme={crAppTheme}>
      <Grid container alignItems="center">
        <Grid item>
          <IconButton color="secondary" onClick={handleLike}>
            <ThumbUpIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1" color="secondary.light">
            {currentLikes}
          </Typography>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default LikeButton;

