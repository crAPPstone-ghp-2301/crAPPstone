import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateComment } from "./commentsSlice";
import { IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import crAppTheme from "../../app/theme";
import { PrimaryButton } from "../styles/StyleGuide";
import { ThemeProvider, Box, Container, TextField, Typography, Grid} from "@mui/material";


const LikeButton = ({ commentId, likes, reviewId }) => {
  const dispatch = useDispatch();
  const [currentLikes, setCurrentLikes] = useState(likes);

  const handleLike = () => {
    const newLikes = currentLikes + 1;
    dispatch(updateComment({ reviewId, commentId, likes: newLikes }));
    setCurrentLikes(newLikes);
  };

  return (
    <Grid container alignItems="center">
      <Grid item>
        <IconButton color="secondary" onClick={handleLike}>
          <ThumbUpIcon />
        </IconButton>
      </Grid>
      <Grid item>
        <Typography>{currentLikes}</Typography>
      </Grid>
    </Grid>
  );
};

export default LikeButton;
