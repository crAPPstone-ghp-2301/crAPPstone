import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchSingleReviewOfRestroomId } from "./reviewSlice";
import AllComments from "../Comments/AllComments";
import crAppTheme from "../../app/theme";
import PastRating from "../rating/PastRating";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Typography,
  Box,
  Divider,
  Card,
  CardMedia,
  useMediaQuery,
} from "@mui/material";
import { PrimaryButton, TertiaryButton } from "../styles/StyleGuide";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Loading from "../loading/Loading";

const SingleReview = () => {
  const dispatch = useDispatch();
  const { reviewId, restroomId } = useParams();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const singleReview = useSelector((state) => state.review.singleReview);
  const { reviewText, imageURL, reportStatus, user } = singleReview;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchSingleReviewOfRestroomId({ restroomId, reviewId })).then(() =>
      setIsLoading(false)
    );
  }, [dispatch]);

  if (isLoading) {
    return (
      <Loading loadingGif="https://media2.giphy.com/media/3o7TKWpg8S6WTD5i7u/200w.webp" />
    );
  }

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
          <Link to={`/restrooms/${restroomId}/reviews`}>
            <TertiaryButton sx={{ position: "absolute", top: 0, left: 0 }}>
              <ArrowBackIcon />
            </TertiaryButton>
          </Link>
          <Box>
            <Box>
              <Card>
                <CardMedia
                  component="img"
                  src={imageURL}
                  alt="Picture unavailable!"
                  onError={(e) => {
                    e.target.src =
                      "https://img.freepik.com/free-vector/cute-cat-poop-cartoon-icon-illustration_138676-2655.jpg?w=2000";
                  }}
                />
                <Box sx={{ p: 2 }}>
                <Typography variant="h5" color="secondary.dark">
                  {user ? user.username : "Anonymous"}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="secondary.light"
                >
                  {reviewText}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="secondary.light"
                >
                  Report: {reportStatus}
                  </Typography>
                  </Box>
                <Divider />
                <AllComments reviewId={reviewId} />
              </Card>
            </Box>
          </Box>
        </Container>
      </Container>
    </ThemeProvider>
  );
};

export default SingleReview;
