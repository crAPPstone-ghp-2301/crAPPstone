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
  useMediaQuery,
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
  const isMobile = useMediaQuery("(max-width:900px)");

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

  return (
    <>
      <ThemeProvider theme={crAppTheme}>
        <Box
          id="single-restroom-container"
          sx={{
            position: "fixed",
            top: 0,
            left: isMobile ? 0 : "100px",
            zIndex: isMobile ? 2 : 1,
            backgroundColor: "white",
            width: isMobile ? "100%" : 450,
            height: "100%",
            overflow: "auto",
            paddingBottom: 10,
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              p: 1,
            }}
          >
            <Link to="/">
              <TertiaryButton sx={{ position: "absolute", top: 0, right: 0 }}>
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
              <Box sx={{ my: 2 }}>
                <AddRating />
              </Box>
              <Divider />
              <Box
                sx={{
                  m: 1,
                  p: 1,
                  borderRadius: 2,
                  backgroundColor: crAppTheme.palette.primary.main,
                }}
              >
                <span>
                  <Typography
                    variant="overline"
                    sx={{
                      color: crAppTheme.palette.primary.dark,
                      border: `1px solid ${crAppTheme.palette.primary.dark}`,
                      borderRadius: 2,
                      m: 1,
                      p: 0.5,
                      textTransform: "none",
                    }}
                  >
                    Ad -{" "}
                    <a
                      href="https://empireeats.onrender.com/"
                      target="_blank"
                      style={{ textTransform: "none" }}
                    >
                      https://empireeats.onrender.com
                    </a>
                  </Typography>
                </span>
                <Box sx={{ display: "flex", flexDirection: "column", m: 1 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: "900",
                      color: crAppTheme.palette.primary.dark,
                      lineHeight: 1,
                    }}
                  >
                    Dropped the kids off at the pool and craving some food?
                  </Typography>
                  <span>
                    <Typography
                      variant="caption"
                      sx={{
                        color: crAppTheme.palette.primary.dark,
                        paddingRight: 1,
                      }}
                    >
                      Check out Empire Eats
                    </Typography>
                    <a href="https://empireeats.onrender.com/" target="_blank">
                      <OpenInNewRoundedIcon />
                    </a>
                  </span>
                </Box>
              </Box>
              <Divider />
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default SingleRestroom;
