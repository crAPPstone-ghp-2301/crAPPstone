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
  Box,
  Card,
  CardMedia,
  CardContent,
  CssBaseline,
} from "@mui/material";
import { SecondaryButton, TertiaryButton } from "../styles/StyleGuide";
import BookmarkAddRoundedIcon from "@mui/icons-material/BookmarkAddRounded";
import NoteAddRoundedIcon from "@mui/icons-material/NoteAddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const AllRestrooms = () => {
  const restrooms = useSelector(selectRestroom);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRestrooms());
  }, [dispatch]);

  const handleAddSavedRestroom = async (restroomId) => {
    console.log("restroom id", restroomId);
    await dispatch(addSavedRestroom(restroomId));
  };

  return (
    <ThemeProvider theme={crAppTheme}>
      <CssBaseline />
      <Container
        id="restroom-container"
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
            marginTop: 10,
          }}
        >
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{
              marginBottom: 5,
              textAlign: "center",
            }}
          >
            All Restrooms
          </Typography>
          <Link to="/">
            <TertiaryButton sx={{ position: "absolute", top: 80, right: 0 }}>
              <CloseRoundedIcon />
            </TertiaryButton>
          </Link>
          <Box>
            {Array.isArray(restrooms) &&
              restrooms.map((restroom) => {
                return (
                  <Card
                    sx={{
                      display: "flex",
                      my: 2,
                      width: 380,
                    }}
                    key={restroom.id}
                  >
                    <Link
                      to={`/restrooms/${restroom.id}`}
                      style={{ display: "flex" }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <CardContent sx={{ flex: "1 0 auto" }}>
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: "900",
                              color: crAppTheme.palette.primary.dark,
                            }}
                          >
                            {restroom.name}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: crAppTheme.palette.primary.dark }}
                          >
                            {restroom.openingHours}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: crAppTheme.palette.primary.dark }}
                          >
                            {restroom.description}
                          </Typography>
                        </CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            pl: 1,
                            pb: 1,
                          }}
                        >
                          <SecondaryButton>
                            <NoteAddRoundedIcon /> Review
                          </SecondaryButton>
                          <TertiaryButton
                            variant="contained"
                            size="small"
                            onClick={() => handleAddSavedRestroom(restroom.id)}
                          >
                            <BookmarkAddRoundedIcon />
                            Save
                          </TertiaryButton>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          flexGrow: 1,
                        }}
                      >
                        <CardMedia
                          component="img"
                          src={restroom.imageUrl}
                          alt="Restroom"
                          sx={{ width: 300 }}
                        />
                      </Box>
                    </Link>
                  </Card>
                );
              })}
          </Box>
        </Container>
      </Container>
    </ThemeProvider>
  );
};

export default AllRestrooms;
