import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectSingleRestroom, getSingleRestroom } from "./singleRestroomSlice";
import { ThemeProvider } from "@mui/material/styles";
import crAppTheme from "../../app/theme";
import AddRating from "../rating/Rating"
import PastRating from "../rating/PastRating"
import {
  Typography,
  Container,
  Tabs,
  Tab,
  Box,
  Card,
  CardMedia,
  Rating,
} from "@mui/material";
import {
  PrimaryButton,
  SecondaryButton,
  TertiaryButton,
} from "../styles/StyleGuide";
import { fetchAllReviews } from "../review/reviewSlice";
import { fetchAllReviewsOfRestroomId } from "../review/reviewSlice";
import { addSavedRestroom } from "../save/saveSlice";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import BookmarkAddRoundedIcon from "@mui/icons-material/BookmarkAddRounded";
import BookmarkAddedRoundedIcon from "@mui/icons-material/BookmarkAddedRounded";
import {fetchRatings} from "../rating/RatingSlice"

const SingleRestroom = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const reviews = useSelector((state) => state.review.allReviews);
  const [activeTab, setActiveTab] = useState(0);
  const [savedRestroomIds, setSavedRestroomIds] = useState([]);
  const restroom = useSelector(selectSingleRestroom);
  const ratings=useSelector(state=>state.rating.pastRating)
  const sumRatings = ratings && ratings.length ? ratings.reduce((sum, rating) => {
    return sum + rating.userRating;
  }, 0) : 0;
  const averageRating = sumRatings>0 ? (sumRatings / ratings.length).toFixed(1) : 0 



  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    dispatch(getSingleRestroom(id));
    dispatch(fetchAllReviewsOfRestroomId(id));
    dispatch(fetchAllReviews());
    dispatch(fetchRatings(id))
  }, [dispatch, id ]);

  const handleAddSavedRestroom = async (restroomId) => {
    console.log("restroom id", restroomId);
    await dispatch(addSavedRestroom(restroomId));
  };

  const isRestroomSaved = (restroomId) => {
    return savedRestroomIds.includes(restroomId);
  };

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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
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
                  onClick={() => handleAddSavedRestroom(restroom.id)}
                >
                  {isRestroomSaved(restroom.id) ? (
                    <>
                      <BookmarkAddedRoundedIcon />
                      <Typography variant="caption">Saved</Typography>
                    </>
                  ) : (
                    <>
                      <BookmarkAddRoundedIcon />
                      <Typography variant="caption">Save</Typography>
                    </>
                  )}
                </SecondaryButton>
              </Box>
              <Box>
                <Rating size="small" value={averageRating} readOnly />
              <Typography
             variant="caption"
             sx={{ color: crAppTheme.palette.primary.dark }}
                >{`(${ratings.length})`}</Typography>
             </Box>

              <Typography variant="caption" color="secondary.light">
                Hours of Operation: {restroom.openingHours}
              </Typography>
              <br />
              <Typography variant="body2" color="secondary.light">
                <br />
                Description: {restroom.description}
              </Typography>
              <Link to={`/restrooms/${restroom.id}/reviews`}>
                <PrimaryButton>Reviews</PrimaryButton>
              </Link>

              <PrimaryButton
              onClick={() => handleAddSavedRestroom(restroom.id)} >Save
              </PrimaryButton>

              <Container style={{ marginTop: '3rem' }}>
                <AddRating/>
              </Container>
             
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