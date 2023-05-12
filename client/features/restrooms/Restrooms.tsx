import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { getAllRestrooms, selectRestroom } from "./allRestroomSlice";
import crAppTheme from "../../app/theme";
import { addSavedRestroom } from "../save/saveSlice";
import {
  Typography,
  Container,
  Button,
  Box,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

const AllRestrooms = () => {
  const restrooms = useSelector(selectRestroom);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRestrooms());
  }, [dispatch]);

  const handleAddSavedRestroom = async (restroomId) => {
    console.log('restroom id', restroomId)
    await dispatch(addSavedRestroom(restroomId))
  }


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
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={restroom.imageUrl}
                        sx={{ height: 300, objectFit: "cover" }}
                      />
                      <CardContent
                        sx={{ height: 150 }}
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
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                    }}
                  >
                    Add a Review
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: "50px",
                      right: "10px",
                    }}
                    onClick={() => handleAddSavedRestroom(restroom.id)}
                  >
                    Save Restroom
                  </Button>
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
