import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { fetchAllReviewsOfRestroomId } from "./reviewSlice";
import crAppTheme from "../../app/theme";
import {
  Card,
  Box,
  Typography,
  CardMedia,
  ThemeProvider,
  Divider,
} from "@mui/material";

/* this component should 
- fetch all reviews of a restroom id
- users can add a review 
- upon click to a review, will navigate to expanded view SingleReview component.
- (AddReview component will make soon) in review form, users can add their reviewText, imageURL, and their reportStatus, ratings. 

view:
similarly to google maps, we access all reviews of a restroom id by first clicking on a marker that will display single restroom details and will have a "review tab" that will link to all reviews of a restroom. 


brain dump
- how would it know which restroom id is being fetched 
- possible plan 
1) change API routes for reviews and comments to show restroom/:restroomId/reviews and thunks so that we can detect the restroom id
*/

const AllReviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { restroomId } = useParams();

  useEffect(() => {
    dispatch(fetchAllReviewsOfRestroomId(restroomId));
  }, [dispatch, restroomId]);

  const reviews = useSelector((state) => state.review.allReviews);

  const handleReviewClick = (id) => {
    navigate(`/reviews/${id}`);
  };

  return (
    <ThemeProvider theme={crAppTheme}>
      <Box display="flex" flexDirection="column" width="50%" height="100%">
        <Box flexGrow={1} sx={{ position: "absolute", zIndex: 1 }}>
          <Card>
            <Link to={`/restroom/${restroomId}`}>
              <Typography
                variant="h6"
                sx={{
                textDecoration: "none",
                  color: "brown",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                  paddingLeft: "21rem",
                }}

              >
                Back
              </Typography>
            </Link>
            <Typography variant="h5" component="h2" paddingLeft="48%">
              Reviews
            </Typography>
          </Card>
          <Divider />
          {reviews.map((review) => (
            <Card
              key={review.id}
              onClick={() => handleReviewClick(review.id)}
              sx={{
                cursor: "pointer",
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  maxWidth: 400,
                  paddingLeft: "100px",
                  zIndex: 1,
                }}
                src={review.imageURL}
                alt="Picture unavailable!"
                onError={(e) => {
                  e.target.src =
                    "https://img.freepik.com/free-vector/cute-cat-poop-cartoon-icon-illustration_138676-2655.jpg?w=2000";
                }}
              />
              <Typography variant="subtitle1" paddingLeft="35%">
                {review.reviewText}
              </Typography>
              <Typography variant="subtitle1" paddingLeft="35%">
                Report: {review.reportStatus}
              </Typography>
              <Divider />
            </Card>
          ))}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AllReviews;
