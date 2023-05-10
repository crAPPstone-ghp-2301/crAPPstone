import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateComment } from "./commentsSlice";

const LikeButton = ({ commentId, likes, reviewId }) => {
  const dispatch = useDispatch();
  const [currentLikes, setCurrentLikes] = useState(likes);

  const handleLike = () => {
    const newLikes = currentLikes + 1;
    dispatch(updateComment({ reviewId, commentId, likes: newLikes }));
    setCurrentLikes(newLikes);
  };

  return (
    <div>
      <button onClick={handleLike}>Like</button>
      <span>{currentLikes}</span>
    </div>
  );
};

export default LikeButton;