import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { fetchAllReviewsOfRestroomId } from "./reviewSlice";
import crAppTheme from "../../app/theme";
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
import AddReview from "./AddReview";
import { TertiaryButton } from "../styles/StyleGuide";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const AllReviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { restroomId } = useParams();
  const [activeTab, setActiveTab] = useState(1);
  const isMobile = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    dispatch(fetchAllReviewsOfRestroomId(restroomId));
  }, [dispatch, restroomId]);

  const reviews = useSelector((state) => state.review.allReviews);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleReviewClick = (id) => {
    navigate(`/reviews/${id}`);
  };

  return (
    <ThemeProvider theme={crAppTheme}>
      <CssBaseline />
      <Container
        id="edit-profile-container"
        sx={{
          position: "fixed",
          top: 0,
          left: "100px",
          zIndex: 1,
          backgroundColor: "white",
          height: "100vh",
          width: isMobile ? "100%" : "450px", 
          padding: isMobile ? "20px" : "0", 
          overflowY: isMobile ? "auto" : "hidden",
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
                to={`/restrooms/${restroomId}`}/>
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
            <Box>
              <AddReview restroomId={restroomId} />
              <Divider />
              <Box
                style={{
                  height: "450px",
                  overflowY: "scroll",
                }}
              >
                {reviews.map((review) => (
                  <Card
                    key={review.id}
                    onClick={() => handleReviewClick(review.id)}
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
                    <Typography variant="h5" color="secondary.dark">
                      {review.user ? review.user.username : "Anonymous"}
                    </Typography>
                    <Typography variant="subtitle1" color="secondary.light">
                      {review.reviewText}
                    </Typography>
                    <Typography variant="subtitle1" color="secondary.light">
                      Report: {review.reportStatus}
                    </Typography>
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
