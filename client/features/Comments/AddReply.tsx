import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createComment } from "./commentsSlice";
import crAppTheme from "../../app/theme";
import { SecondaryButton } from "../styles/StyleGuide";
import {
  ThemeProvider,
  Box,
  Container,
  TextField,
  Typography,
} from "@mui/material";

const AddReply = ({ parentCommentId, onClose }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createComment({ content, parentCommentId }));
    setContent("");
    onClose();
  };

  return (
    <ThemeProvider theme={crAppTheme}>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "50%",
          margin: "0 auto",
        }}
      >
        <Container>
          <TextField
            label="Add Reply"
            value={content}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            margin="normal"
          />

          <SecondaryButton
            type="submit"
            variant="contained"
            // color="primary"
            disabled={!content.trim()}
            onClick={handleSubmit}
            style={{ marginTop: "10px" }}
          >
            <Typography variant="subtitle1" sx={{ textTranform: "capitalize" }}>
              Submit
            </Typography>
          </SecondaryButton>

          <SecondaryButton
            type="button"
            variant="contained"
            disabled={!content.trim()}
            onClick={onClose}
            style={{ marginTop: "10px" }}
          >
            <Typography variant="subtitle1" sx={{ textTranform: "capitalize" }}>
              Cancel
            </Typography>
          </SecondaryButton>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default AddReply;
