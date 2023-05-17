import React, { useEffect, useState } from "react";
import crAppTheme from "../../app/theme";
import {
  PrimaryButton,
  SecondaryButton,
  TertiaryButton,
} from "../styles/StyleGuide";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { selectSingleRestroom, getSingleRestroom } from "./singleRestroomSlice";
import { fetchAllReviews } from "../review/reviewSlice";
import { fetchAllReviewsOfRestroomId } from "../review/reviewSlice";
import { addSavedRestroom } from "../save/saveSlice";
import AddRating from "../rating/Rating";
import {
  ThemeProvider,
  Typography,
  Container,
  Tabs,
  Tab,
  Box,
  Card,
  CardMedia,
  Divider,
  Snackbar,
  Rating,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import BookmarkAddRoundedIcon from "@mui/icons-material/BookmarkAddRounded";
import BookmarkAddedRoundedIcon from "@mui/icons-material/BookmarkAddedRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { fetchRatings } from "../rating/RatingSlice";

const SingleRestroom = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const reviews = useSelector((state) => state.review.allReviews);
  const [activeTab, setActiveTab] = useState(0);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [savedRestroomIds, setSavedRestroomIds] = useState([]);
  const restroom = useSelector(selectSingleRestroom);
  const ratings = useSelector((state) => state.rating.pastRating);
  const restroomName = restroom.name;

  useEffect(() => {
    document.title = `${restroomName} - crAPP the Map`;
  });

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  const sumRatings =
    ratings && ratings.length
      ? ratings.reduce((sum, rating) => {
          return sum + rating.userRating;
        }, 0)
      : 0;
  const averageRating =
    sumRatings > 0 ? (sumRatings / ratings.length).toFixed(1) : 0;

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    dispatch(getSingleRestroom(id));
    dispatch(fetchAllReviewsOfRestroomId(id));
    dispatch(fetchAllReviews());
    dispatch(fetchRatings(id));
  }, [dispatch, id]);

  const handleAddSavedRestroom = async (restroomId) => {
    await dispatch(addSavedRestroom(restroomId));
    setIsSnackbarOpen(true);
  };

  const isLoggedIn = useSelector((state) => {
    const { me, authToken } = state.auth;
    const storedAuthToken = localStorage.getItem("authToken");
    const storedUserId = sessionStorage.getItem("userId");
    return (
      me.id ||
      (authToken && storedAuthToken === authToken) ||
      (storedUserId && me.id === storedUserId)
    );
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      const container = document.getElementById("single-restroom-container");
      if (container && !container.contains(event.target)) {
        navigate("/");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleWriteReview = () => {
    navigate(`reviews/add`);
  };

  return (
    <>
      <ThemeProvider theme={crAppTheme}>
        <Box
          id="single-restroom-container"
          sx={{
            position: "fixed",
            top: 0,
            left: "100px",
            zIndex: 1,
            backgroundColor: "white",
            width: 450,
            height: "100%",
            overflow: "auto",
            paddingBottom: 10,
            "&::-webkit-scrollbar": {
              display: "none",
            },
            "@media (max-width: 700px)": {
              left: "0",
              width: "90%",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <Link to="/">
              <TertiaryButton sx={{ position: "absolute", top: 280, right: 0 }}>
                <CloseRoundedIcon />
              </TertiaryButton>
            </Link>
            <img src={restroom.imageUrl} style={{ width: "100%", top: 0 }} />
            <Container>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignContent: "center",
                  alignItems: "center",
                  justifyContent: "space-between",
                  my: 2,
                }}
              >
                <Box>
                  <Typography
                    gutterBottom
                    variant="body1"
                    sx={{
                      fontWeight: "900",
                      color: crAppTheme.palette.primary.dark,
                      lineHeight: 1,
                    }}
                  >
                    {restroom.name}
                  </Typography>
                  <Rating size="small" value={averageRating} readOnly />
                  <Typography
                    variant="caption"
                    sx={{ color: crAppTheme.palette.primary.dark }}
                  >{`(${ratings.length})`}</Typography>
                </Box>
                <SecondaryButton
                  onClick={
                    isLoggedIn
                      ? () => handleAddSavedRestroom(restroom.id)
                      : () => navigate("/login")
                  }
                >
                  <BookmarkAddRoundedIcon />
                  <Typography variant="caption">Save</Typography>
                </SecondaryButton>
                <Snackbar
                  open={isSnackbarOpen}
                  autoHideDuration={3000}
                  onClose={handleCloseSnackbar}
                  message={
                    <>
                      {restroom.name} is saved <BookmarkAddedRoundedIcon />
                    </>
                  }
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                />
              </Box>
              <Box sx={{ borderBottom: 1, borderColor: "divider", my: 2 }}>
                <Tabs
                  value={activeTab}
                  onChange={handleTabChange}
                  variant="fullWidth"
                  textColor="primary"
                  indicatorColor="secondary"
                  sx={{
                    "& .Mui-selected": {
                      backgroundColor: crAppTheme.palette.primary.dark,
                    },
                  }}
                >
                  <Tab label="Overview" />
                  <Tab
                    label="Reviews"
                    component={Link}
                    to={`/restrooms/${restroom.id}/reviews`}
                  />
                </Tabs>
              </Box>
              <Box sx={{ my: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    color: crAppTheme.palette.primary.dark,
                    my: 1,
                  }}
                >
                  <LocationOnRoundedIcon sx={{ marginRight: 1 }} />
                  <Typography variant="body2">{restroom.address}</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    color: crAppTheme.palette.primary.dark,
                    my: 1,
                  }}
                >
                  <AccessTimeRoundedIcon sx={{ marginRight: 1 }} />
                  <Typography variant="caption">
                    {restroom.openingHours}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    color: crAppTheme.palette.primary.dark,
                    my: 1,
                  }}
                >
                  <InfoRoundedIcon sx={{ marginRight: 1 }} />
                  <Typography variant="body2">
                    {restroom.description}
                  </Typography>
                </Box>
              </Box>
              <Divider />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <SecondaryButton onClick={handleWriteReview}>
                  <Typography variant="subtitle1">Write a Review</Typography>
                </SecondaryButton>
              </Box>
              <Box sx={{ my: 2 }}>
                <AddRating />
              </Box>
              <Divider />
              <Box sx={{ m: 2 }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "900",
                    color: crAppTheme.palette.primary.dark,
                    lineHeight: 1,
                  }}
                >
                  Dropped the kids off at the pool… now craving some food?
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: crAppTheme.palette.primary.dark,
                    paddingRight: 2,
                  }}
                >
                  Check out Empire Eats
                </Typography>
                <a href="https://empireeats.onrender.com/" target="_blank">
                  <OpenInNewRoundedIcon />
                </a>
              </Box>
              <Divider />
            </Container>
            <Box
              style={{
                height: "310px",
                overflow: "auto",
                paddingRight: "20px",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {reviews
                .filter((review) => review.restroomId === id) // Filter reviews based on restroomId matching id
                .map((review) => (
                  <Card
                    key={review.id}
                    sx={{
                      cursor: "pointer",
                      paddingBottom: "10px",
                    }}
                  >
                    <CardMedia
                      component="img"
                      src={review.imageURL}
                      alt="Picture unavailable!"
                      onError={(e) => {
                        e.target.src =
                          "https://img.freepik.com/free-vector/cute-cat-poop-cartoon-icon-illustration_138676-2655.jpg?w=2000";
                      }}
                    />
                    <Typography variant="h5">
                      {review.user ? review.user.username : "Anonymous"}
                    </Typography>
                    <Typography variant="subtitle1">
                      {review.reviewText}
                    </Typography>
                    <Typography variant="subtitle1">
                      Report: {review.reportStatus}
                    </Typography>
                  </Card>
                ))}
            </Box>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default SingleRestroom;
