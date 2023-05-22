import React, { useState, useEffect } from "react";
import axios from "axios";
import crAppTheme from "../../app/theme";
import { useDispatch, useSelector } from "react-redux";
import { createReview, fetchAllReviewsOfRestroomId } from "./reviewSlice";
import { selectSingleRestroom } from "../restrooms/singleRestroomSlice";
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
  IconButton,
} from "@mui/material";
import { createRating, fetchRatings } from "../rating/RatingSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  SecondaryButton,
  TertiaryButton,
  StyledRating,
  customIcons,
  CustomizedTextField
} from "../styles/StyleGuide";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PropTypes from "prop-types";

const AddReview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:700px)");
  const userId = useSelector((state) => state.auth.me.id);
  const { restroomId } = useParams();
  const restroom = useSelector(selectSingleRestroom);
  const restroomName = restroom.name;
  const [reviewText, setReviewText] = useState("");
  const [reportStatus, setReportStatus] = useState("none");
  const [selectedFile, setSelectedFile] = useState(null);
  //settings in rating
  const initialRating = 0; // Initial rating value
  const initialLikeChecked = false; // Initial checkbox value for "like"
  const initialHateChecked = false; // In
  const [userRating, setuserRating] = useState(initialRating);
  const [isClean, setisClean] = useState(false);
  const [showOptional, setShowOptional] = useState(false);

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
    navigate(`/restrooms/${restroomId}/reviews`);
  };

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
        <Container
          sx={{
            p: 2,
            color: crAppTheme.palette.primary.dark,
            textAlign: "center",
          }}
        >
          <Typography variant="h3" sx={{ my: 1 }}>
            Add A Review
          </Typography>
          <Typography variant="body1">{restroomName}</Typography>
          <Box
            sx={{
              justifyContent: "center",
              alignItems: "center",
              color: crAppTheme.palette.primary.dark,
              textAlign: "center",
              my: 2,
              textTransform: "capitalize",
            }}
          >
            <Typography variant="subtitle1">Rate your Experience</Typography>
            <StyledRating
              name="customized-icons"
              value={userRating}
              getLabelText={(value) => customIcons[value].label}
              IconContainerComponent={IconContainer}
              onChange={handleRatingChange}
            />

          </Box>
          <Container>
            <form onSubmit={handleSubmit}>
              <CustomizedTextField
                id="outlined-required"
                label="Add Review"
                value={reviewText}
                onChange={handleChange}
                multiline
                rows={3}
                variant="outlined"
                margin="normal"
              />
              <Box
                sx={{
                  backgroundColor: crAppTheme.palette.primary.light,
                  color: crAppTheme.palette.primary.dark,
                  m: 2,
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  borderRadius: 4,
                }}
              >
                <Typography variant="overline">
                  Other Options
                  <IconButton
                    onClick={() => setShowOptional(!showOptional)}
                    sx={{ float: "right" }}
                  >
                    {showOptional ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Typography>
                {showOptional && (
                  <>
                    <Box
                      sx={{
                        border: `1px solid ${crAppTheme.palette.primary.dark}`,
                        borderRadius: "4px",
                        my: 2,
                      }}
                    >
                      <Typography variant="caption">
                        Report Restroom Status:
                      </Typography>
                      <RadioGroup
                        value={reportStatus}
                        onChange={handleReportStatusChange}
                        row
                        sx={{
                          m: 2,
                        }}
                      >
                        <FormControlLabel
                          value="none"
                          control={<Radio />}
                          label="None"
                        />
                        <FormControlLabel
                          value="clean"
                          control={<Radio />}
                          label="Clean"
                        />
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
                    </Box>
                    <Box
                      sx={{
                        my: 1,
                        border: `1px solid ${crAppTheme.palette.primary.dark}`,
                        borderRadius: "4px",
                        padding: "8px",
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{ my: 2, textAlign: "left" }}
                      >
                        Upload a Restroom Image:
                      </Typography>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        style={{
                          color: crAppTheme.palette.text.dark,
                          marginTop: 10,
                          width: "100%",
                        }}
                      />
                    </Box>
                  </>
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  my: 4,
                }}
              >
                <SecondaryButton onClick={userId ? handleSubmit : handleLogin}>
                  <Typography variant="subtitle1">
                    Submit <CheckCircleIcon />
                  </Typography>
                </SecondaryButton>
                <TertiaryButton onClick={handleCancel}>
                  <Typography variant="subtitle1">Cancel</Typography>
                </TertiaryButton>
              </Box>
            </form>
          </Container>
        </Container>
      </Container>
    </ThemeProvider>
  );
};

export default AddReview;
