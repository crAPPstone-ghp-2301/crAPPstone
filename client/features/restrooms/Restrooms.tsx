import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { getAllRestrooms, selectRestroom } from "./allRestroomSlice";
import crAppTheme from "../../app/theme";
import {
  Typography,
  Container,
  Box,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

const AllRestrooms = () => {
  const restrooms = useSelector(selectRestroom);
<<<<<<< HEAD
  useEffect(() => {
    dispatch(getAllRestrooms());
  }, [dispatch]);
=======
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRestrooms());
  }, [dispatch]);

>>>>>>> d6ef03b86789fdc461a33bba2c90351c368dd35e
  
  return (
    <>
    <ThemeProvider theme={crAppTheme}>
      <Container maxWidth="lg" sx={{ marginTop: 10 }}>
        <Typography
          variant="h3"
          component="h1"
          align="center"
          gutterBottom
          sx={{
            marginBottom: 5,
            background:
              "#FEFAE0",
            textAlign: "center",
          }}
        >
          All Restrooms
        </Typography>
        <Container
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}
        >
          {Array.isArray(restrooms) &&
            restrooms.map((restroom) => {
              return (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    margin: "5px",
                    height: "100%",
                    position: "relative",
                  }}
                  key={restroom.id}
                >
                  <Link
                    to={`/restrooms/${restroom.id}`}
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <Card
                      sx={{
                        maxWidth: 600,
                        border: "none",
                        "&:hover": {
                          border: "2px solid",
                          borderImage:
                            "linear-gradient(45deg, #7F00FF, #00bfff, #ff00ff) 1",
                          boxShadow: "0 0px 20px #7F00FF",
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={restroom.imageUrl}
                        sx={{ height: 300, objectFit: "cover" }}
                      />
                      <CardContent
                        sx={{ backgroundColor: "#200040", height: 150 }}
                      >
                        <Typography
                          gutterBottom
                          variant="body"
                          component="div"
                          color="primary.light"
                          sx={{ fontWeight: "900" }}
                        >
                          {restroom.name}
                        </Typography>
                        <Typography variant="body2">
                          {restroom.openingHours}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                  <SecondaryButton
                    variant="contained"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                    }}
                  >
                    Add a Review
                  </SecondaryButton>
                </Box>
              );
            })}
        </Container>
      </Container>
    </ThemeProvider>
    </>
  );
};

export default AllRestrooms;
