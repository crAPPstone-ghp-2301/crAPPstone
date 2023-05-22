import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateComment } from "./commentsSlice";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import crAppTheme from "../../app/theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { TertiaryButton } from "../styles/StyleGuide";

const LikeButton = ({ commentId, initialLikes, userToken }) => {
  const dispatch = useDispatch();
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const hasUserLiked = localStorage.getItem(`liked:${commentId}`);
    if (hasUserLiked) {
      setHasLiked(true);
    }
  }, [commentId]);

  const handleLike = () => {
    if (!hasLiked) {
      const newLikes = likes + 1;
      setLikes(newLikes);
      setHasLiked(true);
      localStorage.setItem(`liked:${commentId}`, "true");
      dispatch(updateComment({ commentId, likes: newLikes }));
    } else {
      const newLikes = likes - 1;
      setLikes(newLikes);
      setHasLiked(false);
      localStorage.removeItem(`liked:${commentId}`);
      dispatch(updateComment({ commentId, likes: newLikes }));
    }
  };

  return (
    <ThemeProvider theme={crAppTheme}>
      <CssBaseline />
      <TertiaryButton onClick={handleLike}>
        <span>
          {hasLiked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
          <span style={{ marginLeft: "0.5rem" }}>{likes}</span>
        </span>
      </TertiaryButton>
    </ThemeProvider>
  );
};

export default LikeButton;
