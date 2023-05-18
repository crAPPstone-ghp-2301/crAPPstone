import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createComment, fetchAllComments } from "./commentsSlice";
import crAppTheme from "../../app/theme";
import { PrimaryButton } from "../styles/StyleGuide";
import {
  ThemeProvider,
  Box,
  Container,
  TextField,
  Typography,
} from "@mui/material";

const AddComment = ({ reviewId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const user = useSelector((state) => state.auth.me);

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userId = user ? user.userId : null;
    dispatch(createComment({ content, reviewId, userId })).then(() => {
      dispatch(fetchAllComments(reviewId));
      setContent("");
      navigate(`/reviews/${reviewId}`);
    });
  };

  return (
    <ThemeProvider theme={crAppTheme}>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "100%",
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

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <PrimaryButton
              type="submit"
              variant="contained"
              color="primary"
              disabled={!content.trim()}
              onClick={handleSubmit}
              style={{ marginTop: "1px", width: "100px" }}
            >
              <Typography
                variant="subtitle1"
                sx={{ textTranform: "capitalize" }}
              >
                Submit
              </Typography>
            </PrimaryButton>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default AddComment;
