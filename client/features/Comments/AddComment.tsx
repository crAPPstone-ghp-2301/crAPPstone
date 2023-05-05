import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createComment } from "./commentsSlice";

const AddComment = ({ reviewId, onClose }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createComment({ content, reviewId }));
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Comment here!!!!!!!!!"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Submit</button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
};
export default AddComment;
