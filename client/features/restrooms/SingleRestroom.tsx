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

const SingleRestroom = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const restroom = useSelector((state) => state.singleRestroom.singleRestroom);
  console.log("SINGLE RESTROOM===============>", restroom);

  useEffect(() => {
    dispatch(getSingleRestroom(id));
    dispatch(getAllRestrooms());
  }, [id, dispatch]);
//merge
  return (
    <>
      <ThemeProvider theme={crAppTheme}>
        <Card
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
          <CardMedia
            component="img"
            image={restroom.imageUrl}
            sx={{ height: 200, objectFit: "cover" }}
          />
          <CardContent sx={{ height: 150, overflow: "auto" }}>
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
            <Button
              sx={{
                marginTop: "auto",
                color: "primary.light",
                bgcolor: "secondary.light",
              }}
              size="small"
            >
              Add a Review
            </Button>
          </CardContent>
        </Card>
      </ThemeProvider>
    </>
  );
};

export default SingleRestroom;
