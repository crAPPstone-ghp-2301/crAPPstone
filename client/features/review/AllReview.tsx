import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { fetchAllReviewsOfRestroomId, deleteReview } from "./reviewSlice";
import { selectSingleRestroom } from "../restrooms/singleRestroomSlice";
import crAppTheme from "../../app/theme";
import PastRating from "../rating/PastRating";
import {
  Card,
  Box,
  Typography,
  CardMedia,
  CssBaseline,
  Container,
  ThemeProvider,
  Divider,
  Tabs,
  Tab,
  useMediaQuery,
} from "@mui/material";
import { TertiaryButton, SecondaryButton } from "../styles/StyleGuide";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Loading from "../loading/Loading";

const AllReviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { restroomId } = useParams();
  const [activeTab, setActiveTab] = useState(1);
  const isMobile = useMediaQuery("(max-width: 600px)");
  const userId = useSelector((state) => state.auth.me.id);
  const ratings = useSelector((state) => state.rating.pastRating);
  const reviews = useSelector((state) => state.review.allReviews);
  const restroom = useSelector(selectSingleRestroom);
  const restroomName = restroom.name;
  const currentUser = useSelector((state) => state.auth.user);

  const handleLogin = () => {
    navigate("/login");
  };
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchAllReviewsOfRestroomId(restroomId)).then(() =>
      setIsLoading(false)
    );
  }, [dispatch, restroomId]);

  if (isLoading) {
    return (
      <Loading loadingGif="https://media2.giphy.com/media/3o7TKWpg8S6WTD5i7u/200w.webp" />
    );
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleReviewClick = (reviewId) => {
    navigate(`${reviewId}`);
  };

  const handleWriteReview = () => {
    navigate(`add`);
  };

  const handleDeleteReview = (restroomId, reviewId) => {
    dispatch(deleteReview({ restroomId, reviewId })).then(() => {
      dispatch(fetchAllReviewsOfRestroomId(restroomId));
    });
  };

  const isCurrentUserPostOwner = (review) => {
    let token = localStorage.getItem("token");
    if (token) {
      return review.userId === userId;
    }
    return false;
  };

  return (
    <ThemeProvider theme={crAppTheme}>
      <CssBaseline />
      <Container
        id="review-container"
        sx={{
          position: "fixed",
          top: 0,
          left: isMobile ? 0 : "100px",
          zIndex: isMobile ? 2 : 1,
          backgroundColor: "white",
          width: isMobile ? "100%" : 450,
          height: "100%",
          overflowY: "scroll",
          paddingBottom: 10,
          scrollBehavior: "smooth",
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
          "&::-webkit-scrollbar-thumb:vertical": {
            minHeight: "30px",
          },
          "&::-webkit-scrollbar-thumb:vertical:active": {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
          "&::-webkit-scrollbar-thumb:vertical:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
          "&::-webkit-scrollbar-thumb:horizontal": {
            minWidth: "30px",
          },
          "&::-webkit-scrollbar-thumb:horizontal:active": {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
          "&::-webkit-scrollbar-thumb:horizontal:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
          "&::-webkit-scrollbar-corner": {
            backgroundColor: "transparent",
          },
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            py: 2,
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
              {restroomName}
            </Typography>
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
              <Tab
                label="Overview"
                component={Link}
                to={`/restrooms/${restroomId}`}
              />
              <Tab
                label="Reviews"
                component={Link}
                to={`/restrooms/${restroomId}/reviews`}
              />
            </Tabs>
          </Box>
          <Link to={`/`}>
            <TertiaryButton sx={{ position: "absolute", top: 0, right: 0 }}>
              <CloseRoundedIcon />
            </TertiaryButton>
          </Link>
          <Box>
            <Box sx={{ my: 2 }}>
              <PastRating />
            </Box>
            {userId ? (
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
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <SecondaryButton onClick={handleLogin}>
                  <Typography variant="subtitle1">Write a Review</Typography>
                </SecondaryButton>
              </Box>
            )}

            <Divider />

            <Box>
              <Box>
                {reviews.map((review) => (
                  <Card
                    key={review.id}
                    sx={{
                      paddingBottom: "10px",
                    }}
                  >
                    <CardMedia
                      onClick={() => handleReviewClick(review.id)}
                      component="img"
                      src={review.imageURL}
                      alt="Picture unavailable!"
                      onError={(e) => {
                        e.target.src =
                          "https://img.freepik.com/free-vector/cute-cat-poop-cartoon-icon-illustration_138676-2655.jpg?w=2000";
                      }}
                      sx={{
                        cursor: "pointer",
                      }}
                    />
                    <Box
                      sx={{
                        padding: "10px",
                      }}
                    >
                      <Typography variant="h5" color="secondary.dark">
                        {review.user ? review.user.username : "Anonymous"}
                      </Typography>
                      <Typography variant="subtitle1" color="secondary.light">
                        {review.reviewText}
                      </Typography>
                      <Typography variant="subtitle1" color="secondary.light">
                        Report: {review.reportStatus}
                      </Typography>
                      <Box sx={{ display: "flex" }}>
                        <Box sx={{ marginLeft: "auto" }}>
                          <Typography
                            variant="subtitle2"
                            color="secondary.main"
                            onClick={() => handleReviewClick(review.id)}
                            sx={{
                              cursor: "pointer",
                            }}
                          >
                            Comments: {review.comments.length}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    {isCurrentUserPostOwner(review) && (
                      <Box sx={{ display: "flex" }}>
                        <Box sx={{ marginLeft: "auto" }}>
                          <TertiaryButton
                            onClick={() =>
                              handleDeleteReview(review.restroomId, review.id)
                            }
                          >
                            Delete
                          </TertiaryButton>
                        </Box>
                      </Box>
                    )}
                  </Card>
                ))}
              </Box>
            </Box>
          </Box>
        </Container>
      </Container>
    </ThemeProvider>
  );
};

export default AllReviews;
