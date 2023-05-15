import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createOrUpdateReview, createReview } from "./reviewSlice";
import {
  Box,
  Typography,
  Container,
  TextField,
  MenuItem,
} from "@mui/material";
import { PrimaryButton } from "../styles/StyleGuide";
import ImageUpload from "./ImageUpload";

const AddReview = ({ restroomId }) => {
  const dispatch = useDispatch();
  const [imageURL, setImageURL] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reportStatus, setReportStatus] = useState("none");

  const handleChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleReportStatusChange = (event) => {
    setReportStatus(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createReview({ restroomId, imageURL, reviewText, reportStatus }));


    setReviewText("");
    setReportStatus("none");
    setImageURL("");
  };

  return (
    <Box>
      <Typography variant="h5" marginBottom="1rem">
        Add Review
      </Typography>
      <form onSubmit={handleSubmit}>
        <Container maxWidth="sm">
          <TextField
            label="Add Review"
            value={reviewText}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            margin="normal"
          />
          <TextField
            select
            label="Report Status"
            value={reportStatus}
            onChange={handleReportStatusChange}
            fullWidth
            variant="outlined"
            margin="normal"
          >
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="spam">Spam</MenuItem>
            <MenuItem value="closed">Closed</MenuItem>
            <MenuItem value="super dirty">Super Dirty</MenuItem>
          </TextField>
          <TextField
            label="Image URL"
            value={imageURL}
            onChange={(event) => setImageURL(event.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <PrimaryButton type="submit" variant="contained" color="primary">
            Submit
          </PrimaryButton>
          <ImageUpload restroomId={restroomId} />
        </Container>
      </form>
    </Box>
  );
};

export default AddReview;
