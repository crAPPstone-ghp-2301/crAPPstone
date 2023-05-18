import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchSingleReviewOfRestroomId } from "./reviewSlice";
import AllComments from "../Comments/AllComments";
import crAppTheme from "../../app/theme";
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const SingleReview = () => {
  const dispatch = useDispatch();
  const { reviewId, restroomId } = useParams();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const singleReview = useSelector((state) => state.review.singleReview);
  const { reviewText, imageURL, reportStatus } = singleReview;

  useEffect(() => {
    dispatch(fetchSingleReviewOfRestroomId({ restroomId, reviewId }));
  }, [dispatch]);

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
          <Link to={`/restrooms/${restroomId}/reviews`}>
            <TertiaryButton sx={{ position: "absolute", top: 0, right: 0 }}>
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
                <Typography
                  variant="subtitle1"
                  color="secondary.light"
                  sx={{ px: 2 }}
                >
                  {reviewText}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="secondary.light"
                  sx={{ px: 2 }}
                >
                  Report: {reportStatus}
                </Typography>
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
