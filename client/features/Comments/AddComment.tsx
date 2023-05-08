import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createComment } from "./commentsSlice";
import crAppTheme from "../../app/theme";
import { PrimaryButton } from "../styles/StyleGuide";
import { ThemeProvider, Box, Container, TextField, Typography } from "@mui/material";

const AddComment = ({ reviewId }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createComment({ content, reviewId }));
    setContent("");
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
            label="Add Comment"
            value={content}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            margin="normal"
          />

        <PrimaryButton
          type="submit"
          variant="contained"
          color="primary"
          disabled={!content.trim()}
          onClick={handleSubmit}
          style={{ marginTop: "10px" }}
        >
          <Typography variant="subtitle1" sx={{ textTranform: "capitalize" }}>
            Submit
          </Typography>
          </PrimaryButton>
        </Container>  
      </Box>
    </ThemeProvider>
  );
};

export default AddComment;
