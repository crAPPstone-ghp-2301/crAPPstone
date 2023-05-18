import React, { useState, useEffect } from "react";
import axios from "axios";
import crAppTheme from "../../app/theme";
import { useDispatch, useSelector } from "react-redux";
import { createReview, fetchAllReviewsOfRestroomId } from "./reviewSlice";
import {
  ThemeProvider,
  CssBaseline,
  Box,
  Container,
  TextField,
  useMediaQuery,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { createRating, fetchRatings } from "../rating/RatingSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  SecondaryButton,
  TertiaryButton,
  StyledRating,
  customIcons,
} from "../styles/StyleGuide";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PropTypes from "prop-types";


const AddReview = () => {
  const dispatch = useDispatch();
  const [reviewText, setReviewText] = useState("");
  const [reportStatus, setReportStatus] = useState("none");
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:700px)");

  //settings in rating
  const initialRating = 0; // Initial rating value
  const initialLikeChecked = false; // Initial checkbox value for "like"
  const initialHateChecked = false; // In
  const [userRating, setuserRating] = useState(initialRating);
  const [isClean, setisClean] = useState(false);
  const userId = useSelector((state) => state.auth.me.id);
  const { restroomId } = useParams();
  const restroomName = useSelector(
    (state) => state.singleRestroom.singleRestroom.name
  );

  const handleChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleReportStatusChange = (event) => {
    setReportStatus(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleCancel = (event) => {
    navigate(`/restrooms/${restroomId}/reviews`)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (userRating===0 || reviewText==="" ){
      alert("form could not be empty")
      return 
    }
    else{
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

      await Promise.all([
        dispatch(
          createReview({ restroomId, reviewText, reportStatus, imageURL })
        ),
        dispatch(createRating({ userId, restroomId, userRating, isClean })),
      ]);

      dispatch(fetchAllReviewsOfRestroomId(restroomId));
      dispatch(fetchRatings(restroomId));
      navigate(`/restrooms/${restroomId}/reviews`);
      setReviewText("");
      setReportStatus("none");
      setSelectedFile(null);
      setuserRating(initialRating);
      setLikeChecked(initialLikeChecked);
      setHateChecked(initialHateChecked);
    } catch (error) {
      console.error(error);
    }
  }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRatingChange = (event, newValue) => {
    setuserRating(newValue);
  };

  function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }

  IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
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
        <Link to={`/restrooms/${restroomId}`}>
          <TertiaryButton sx={{ position: "absolute", top: 0, right: 0 }}>
            <CloseRoundedIcon />
          </TertiaryButton>
        </Link>
        <Box sx={{ p: 2 }}>
          <Typography
            variant="h3"
            sx={{ color: crAppTheme.palette.primary.dark, textAlign: "center" }}
          >
            Add A Review
          </Typography>
          <Box
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                color: crAppTheme.palette.primary.dark,
                textAlign: "center",
              }}
            >
              Share your Experience
            </Typography>
           
            <StyledRating
              name="customized-icons"
              value={userRating}
              getLabelText={(value) => customIcons[value].label}
              IconContainerComponent={IconContainer}
              onChange={handleRatingChange}
            />


          </Box>
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
            <RadioGroup
              value={reportStatus}
              onChange={handleReportStatusChange}
              row
              sx={{
                margin: "10px 0",
              }}
            >
              <FormControlLabel value="none" control={<Radio />} label="None" />
              <FormControlLabel value="clean" control={<Radio />} label="Clean" />
              <FormControlLabel
                value="dirty"
                control={<Radio />}
                label="Dirty"
              />
              <FormControlLabel
                value="closed"
                control={<Radio />}
                label="Closed"
              />
            </RadioGroup>
            <input type="file" onChange={handleFileChange} />

            {userId ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <SecondaryButton onClick={handleSubmit}>
                  <Typography variant="subtitle1">
                    Submit <CheckCircleIcon />
                  </Typography>
                </SecondaryButton>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <SecondaryButton onClick={handleLogin}>
                  <Typography variant="subtitle1">
                    Submit <CheckCircleIcon />
                  </Typography>
                </SecondaryButton>
              </Box>
            )}
          </form>
          <SecondaryButton onClick={handleCancel}>
                  <Typography variant="subtitle1">
                    Cancel
                  </Typography>
                </SecondaryButton>
          
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AddReview;
