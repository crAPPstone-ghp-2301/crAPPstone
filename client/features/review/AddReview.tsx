import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createReview, fetchAllReviewsOfRestroomId } from "./reviewSlice";
import { Box, Typography, Container, TextField, MenuItem } from "@mui/material";
import { PrimaryButton } from "../styles/StyleGuide";
import axios from "axios";

const AddReview = ({ restroomId }) => {
  const dispatch = useDispatch();
  const [reviewText, setReviewText] = useState("");
  const [reportStatus, setReportStatus] = useState("none");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleReportStatusChange = (event) => {
    setReportStatus(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let imageURL =
        "https://img.freepik.com/free-vector/cute-cat-poop-cartoon-icon-illustration_138676-2655.jpg?w=2000";

      if (selectedFile) {
        console.log("Uploading image!");
        const formData = new FormData();
        formData.append("image", selectedFile);

        const response = await axios.post(
          "http://localhost:8080/api/upload",
          formData
        );
        imageURL = response.data.data.link;
      }

      dispatch(
        createReview({ restroomId, reviewText, reportStatus, imageURL })
      ).then(() => {
        dispatch(fetchAllReviewsOfRestroomId(restroomId));
      });

      setReviewText("");
      setReportStatus("none");
      setSelectedFile(null);
    } catch (error) {
      console.error(error);
    }
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
          <input type="file" onChange={handleFileChange} />
          <PrimaryButton type="submit" variant="contained" color="primary">
            Submit
          </PrimaryButton>
        </Container>
      </form>
    </Box>
  );
};

export default AddReview;
