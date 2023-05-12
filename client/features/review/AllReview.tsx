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
  CssBaseline,
  Container,
  ThemeProvider,
  Divider,
} from "@mui/material";
import AddReview from "./AddReview";
import { PrimaryButton, TertiaryButton } from "../styles/StyleGuide";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";


/* this component should 
- fetch all reviews of a restroom id
- users can add a review 
- upon click to a review, will navigate to expanded view SingleReview component.
- (AddReview component will make soon) in review form, users can add their reviewText, imageURL, and their reportStatus, ratings. 

view:
similarly to google maps, we access all reviews of a restroom id by first clicking on a marker that will display single restroom details and will have a "review tab" that will link to all reviews of a restroom. 


brain dump
-fixing addreview component 
  - make sure proper restroom id is passed to review component when post
  - test api route
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
      <CssBaseline />
      <Container
        id="edit-profile-container"
        sx={{
          position: "fixed",
          top: 0,
          left: "100px",
          zIndex: 1,
          backgroundColor: "white",
          height: "100%",
          width: 450,
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
          <Box sx={{ py: 2 }}>
            <Typography variant="h3">Reviews</Typography>
          </Box>
          {/* <Link to="/"> */}
          <Link to={`/restrooms/${restroomId}`}>
            <TertiaryButton sx={{ position: "absolute", top: 0, right: 0 }}>
              <CloseRoundedIcon />
            </TertiaryButton>
          </Link>
      <Box>
        <Box>
          
              <AddReview restroomId={restroomId} />
          <Divider />
          <Box style={{ height: "310px", overflowY: "scroll", paddingRight:"20px", }}>
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
              <Typography variant="h5" >
                {review.user ? review.user.username : "Anonymous"}
              </Typography>
              <Typography variant="subtitle1" >
                {review.reviewText}
              </Typography>
              <Typography variant="subtitle1" >
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
