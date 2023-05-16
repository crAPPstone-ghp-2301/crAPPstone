import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectSingleRestroom, getSingleRestroom } from "./singleRestroomSlice";
import { getAllRestrooms } from "./allRestroomSlice";
import { ThemeProvider } from "@mui/material/styles";
import crAppTheme from "../../app/theme";
import {
  Typography,
  Container,
  Button,
  Box,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { PrimaryButton } from "../styles/StyleGuide";
import { fetchAllReviews } from "../review/reviewSlice";
import { fetchAllReviewsOfRestroomId } from "../review/reviewSlice";

const SingleRestroom = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const reviews = useSelector((state) => state.review.allReviews);
  console.log(reviews);
  const restroom = useSelector(selectSingleRestroom);
  console.log("SINGLE RESTROOM===============>", restroom);

  useEffect(() => {
    dispatch(getSingleRestroom(id));
    dispatch(fetchAllReviewsOfRestroomId(id));
    dispatch(fetchAllReviews());
  }, [dispatch, id]);

  return (
    <>
      <ThemeProvider theme={crAppTheme}>
        <Card
          sx={{
            maxWidth: 600,
            margin: 10,
            border: "none",
            "&:hover": {
              border: "2px solid",
            },
            position: "fixed",
            zIndex: 1,
            overflow: "auto",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            height: "100%",
          }}
        >
          <CardMedia
            component="img"
            image={restroom.imageUrl}
            sx={{ height: 200, objectFit: "cover" }}
          />
          <CardContent
            sx={{
              height: 250,
            }}
          >
            <Typography
              gutterBottom
              variant="body"
              component="div"
              color="secondary.light"
              sx={{ fontWeight: "900" }}
            >
              {restroom.name}
            </Typography>

            <Typography variant="body3" color="secondary.light">
              {restroom.openingHours}
            </Typography>
            <br />
            <Typography variant="body2" color="secondary.light">
              <br />
              {restroom.description}
            </Typography>
            <Link to={`/restrooms/${restroom.id}/reviews`}>
              <PrimaryButton>Reviews</PrimaryButton>
            </Link>
          </CardContent>
        </Card>
        <Box
          style={{ height: "310px", overflowY: "scroll", paddingRight: "20px" }}
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
                <Typography variant="subtitle1">{review.reviewText}</Typography>
                <Typography variant="subtitle1">
                  Report: {review.reportStatus}
                </Typography>
              </Card>
            ))}
        </Box>
      </ThemeProvider>
    </>
  );
};

export default SingleRestroom;
