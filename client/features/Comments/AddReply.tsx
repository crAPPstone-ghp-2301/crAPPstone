import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createComment } from "./commentsSlice";

const AddReply = ({ parentCommentId, onClose }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createComment({ content, parentCommentId }));
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Reply here!!!!!!"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Submit</button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
}

export default AddReply;
