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

const SingleRestroom = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);
  const restroom = useSelector(selectSingleRestroom);
  console.log("SINGLE RESTROOM===============>", restroom);

  useEffect(() => {
    dispatch(getSingleRestroom(id));
    dispatch(fetchAllReviews());
  }, [dispatch, id]);
  //merge
  return (
    <>
      <ThemeProvider theme={crAppTheme}>
        <Card
          sx={{
            maxWidth: 600,
            maxHeight: 500,
            margin: 10,
            border: "none",
            "&:hover": {
              border: "2px solid",
            },
            position: 'fixed',
            zIndex: 1,
            overflow: "auto",
            scrollbarWidth: "none", 
            "&::-webkit-scrollbar": {
              display: "none", 
              },
          }}
        >
          <CardMedia
            component="img"
            image={restroom.imageUrl}
            sx={{ height: 200, objectFit: "cover" }}
          />
          <CardContent sx={{ 
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
              <PrimaryButton>
                Reviews
              </PrimaryButton>
            </Link>
          </CardContent>
        </Card>
      </ThemeProvider>
    </>
  );
};

export default SingleRestroom;
