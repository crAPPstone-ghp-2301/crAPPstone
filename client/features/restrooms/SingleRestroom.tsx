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
import Rating from "../rating/Rating";
import { fetchAllReviews } from "../review/reviewSlice";
import { fetchAllReviewsOfRestroomId } from "../review/reviewSlice";
import { addSavedRestroom } from "../save/saveSlice";
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
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import BookmarkAddRoundedIcon from "@mui/icons-material/BookmarkAddRounded";
import BookmarkAddedRoundedIcon from "@mui/icons-material/BookmarkAddedRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";

const SingleRestroom = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const reviews = useSelector((state) => state.review.allReviews);
  const [activeTab, setActiveTab] = useState(0);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const restroom = useSelector(selectSingleRestroom);

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false); // Close the snackbar
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    dispatch(getSingleRestroom(id));
    dispatch(fetchAllReviewsOfRestroomId(id));
    dispatch(fetchAllReviews());
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
                <Typography
                  gutterBottom
                  variant="body1"
                  component="div"
                  color="secondary.light"
                  sx={{ fontWeight: "900" }}
                >
                  {restroom.name}
                </Typography>
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

                {/* <Snackbar
                  open={isSnackbarOpen}
                  autoHideDuration={3000}
                  onClose={handleCloseSnackbar}
                  message={
                    <>
                      {restroom.name} is saved <BookmarkAddedRoundedIcon />
                    </>
                  }
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                /> */}
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
                  <Tab label="Reviews" />
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
                <Rating />
              </Box>
              <Divider />
              <Box sx={{ my: 2 }}>
                <Link to={`/restrooms/${restroom.id}/reviews`}>
                  <PrimaryButton>Reviews</PrimaryButton>
                </Link>
              </Box>
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
