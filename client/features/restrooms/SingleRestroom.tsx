import React, { useEffect, useState } from "react";
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
  Tabs,
  Tab,
  Box,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { PrimaryButton, TertiaryButton } from "../styles/StyleGuide";
import { fetchAllReviews } from "../review/reviewSlice";
import { fetchAllReviewsOfRestroomId } from "../review/reviewSlice";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const SingleRestroom = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const reviews = useSelector((state) => state.review.allReviews);
  const [activeTab, setActiveTab] = useState(0);
  console.log(reviews);
  const restroom = useSelector(selectSingleRestroom);
  console.log("SINGLE RESTROOM===============>", restroom);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    dispatch(getSingleRestroom(id));
    dispatch(fetchAllReviewsOfRestroomId(id));
    dispatch(fetchAllReviews());
  }, [dispatch, id]);

  return (
    <>
      <ThemeProvider theme={crAppTheme}>
        <Container
          id="edit-profile-container"
          sx={{
            position: "fixed",
            top: 0,
            left: "100px",
            zIndex: 1,
            backgroundColor: "white",
            width: 450,
            height: "100%",
            overflowY: "scroll",
            paddingBottom: 10,
            "&::-webkit-scrollbar": {
              display: "none",
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
            <Link to="/">
              <TertiaryButton sx={{ position: "absolute", top: 80, right: 0 }}>
                <CloseRoundedIcon />
              </TertiaryButton>
            </Link>
            <Box
              component="img"
              image={restroom.imageUrl}
              sx={{ height: 200, objectFit: "cover" }}
            />
            <Container
              sx={{
                height: 250,
              }}
            >
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
                  m: 4,
                }}
              >
                <Tab label="Overview" />
                <Tab label="Reviews" />
              </Tabs>
              <Typography
                gutterBottom
                variant="body1"
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
            </Container>

            <Box
              style={{
                height: "310px",
                overflowY: "scroll",
                paddingRight: "20px",
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
          </Container>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default SingleRestroom;
