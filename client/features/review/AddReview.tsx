import React, { useState, useEffect } from "react";
import axios from "axios";
import crAppTheme from "../../app/theme";
import { useDispatch } from "react-redux";
import { createReview, fetchAllReviewsOfRestroomId } from "./reviewSlice";
import {
  ThemeProvider,
  CssBaseline,
  Box,
  Container,
  TextField,
  MenuItem,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PrimaryButton, TertiaryButton } from "../styles/StyleGuide";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const AddReview = () => {
  const dispatch = useDispatch();
  const [reviewText, setReviewText] = useState("");
  const [reportStatus, setReportStatus] = useState("none");
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:700px)");
  const { restroomId } = useParams();

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

        const response = await axios.post("/api/upload", formData);
        imageURL = response.data.data.link;
      }

      dispatch(
        createReview({ restroomId, reviewText, reportStatus, imageURL })
      ).then(() => {
        dispatch(fetchAllReviewsOfRestroomId(restroomId));
        navigate(`/restrooms/${restroomId}/reviews`);
      });

      setReviewText("");
      setReportStatus("none");
      setSelectedFile(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={crAppTheme}>
      <CssBaseline />
      <Container
        id="add-review-container"
        sx={{
          position: "absolute",
          zIndex: 1,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFF",
          p: 4,
          width: isMobile ? "100%" : "30%",
          textAlign: "center",
        }}
      >
        <Link to={`/restrooms/${restroomId}/reviews`}>
          <TertiaryButton sx={{ position: "absolute", top: 0, right: 0 }}>
            <CloseRoundedIcon />
          </TertiaryButton>
        </Link>
        <Box sx={{ p: 2 }}>
          <Typography variant="h3">Add A Review</Typography>
          <form onSubmit={handleSubmit}>
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <PrimaryButton type="submit" variant="contained" color="primary">
                Submit
              </PrimaryButton>
            </Box>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AddReview;
