import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchSingleReview } from "./reviewSlice";
import AllComments from "../Comments/AllComments";
import crAppTheme from "../../app/theme";
import { Card, Box, Typography, CardMedia, ThemeProvider, Divider } from "@mui/material";

const SingleReview = () => {
  const dispatch = useDispatch();
  const { reviewId } = useParams();

  const singleReview = useSelector((state) => state.review.singleReview);
  const { reviewText, imageURL, reportStatus } = singleReview;

  useEffect(() => {
    dispatch(fetchSingleReview(reviewId));
  }, [dispatch, reviewId]);

  return (
    <ThemeProvider theme={crAppTheme}>
      <Box display="flex" flexDirection="column" width="50%" height="100%">
        <Box flexGrow={1} sx={{ position: "absolute", zIndex: 1 }}>
          <Card>
            {/* <Typography variant="h3" paddingLeft="35%">
              displaying single review
            </Typography> */}
            <CardMedia
              component="img"
              sx={{
                maxWidth: 400,
                paddingLeft: "100px",
                zIndex: 1,
              }}
              src={imageURL}
              alt="Picture unavailable!"
              onError={(e) => {
                e.target.src =
                  "https://img.freepik.com/free-vector/cute-cat-poop-cartoon-icon-illustration_138676-2655.jpg?w=2000";
              }}
            />
            <Typography variant="subtitle1" paddingLeft="35%">
              {reviewText}
            </Typography>
            <Typography variant="subtitle1" paddingLeft="35%">
              Report: {reportStatus}
            </Typography>
            <Divider />
            <AllComments reviewId={reviewId} />
          </Card>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default SingleReview;
