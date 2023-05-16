import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSaved,
  addSavedRestroom,
  getSavedRestrooms,
  deleteSavedRestroom,
} from "./saveSlice";
import {
  PrimaryButton,
  SecondaryButton,
  TertiaryButton,
} from "../styles/StyleGuide";
import crAppTheme from "../../app/theme";
import { Link } from "react-router-dom";
import {
  Typography,
  Container,
  Box,
  ThemeProvider,
  CssBaseline,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import NoteAddRoundedIcon from "@mui/icons-material/NoteAddRounded";
import axios from "axios";

const Saved = () => {
  const [savedRestrooms, setSavedRestrooms] = useState([]);
  const { id } = useSelector((state) => state.auth.me);
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    async function fetchSavedRestrooms() {
      try {
        const [savedRestroomsResponse, restroomsResponse] = await Promise.all([
          fetch(`/api/saved?userId=${id}`, {
            headers: {
              Authorization: `${token}`,
            },
          }),
          fetch("/api/restrooms"),
        ]);
        const savedRestrooms = await savedRestroomsResponse.json();
        const restrooms = await restroomsResponse.json();

        const restroomsById = {};
        restrooms.forEach((restroom) => {
          restroomsById[restroom.id] = restroom;
        });

        const savedRestroomsWithDetails = savedRestrooms.map(
          (savedRestroom) => ({
            ...savedRestroom,
            restroom: restroomsById[savedRestroom.restroomId],
          })
        );

        setSavedRestrooms(savedRestroomsWithDetails);
      } catch (error) {
        console.log("Error fetching saved restrooms:", error);
      }
    }
    fetchSavedRestrooms();
  }, []);

  const dispatch = useDispatch();

  const handleDeleteSavedRestroom = async (restroomId) => {
    await dispatch(deleteSavedRestroom(restroomId));
    setSavedRestrooms((prevSavedRestrooms) =>
      prevSavedRestrooms.filter(
        (restroom) => restroom.restroomId !== restroomId
      )
    );
  };

  return (
    <ThemeProvider theme={crAppTheme}>
      <CssBaseline />
      <Box
        id="saved-container"
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
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            py: 2,
            marginTop: 10,
          }}
        >
          <Box sx={{ py: 1 }}>
            <Typography variant="h3">Saved Restrooms</Typography>
            <Typography variant="subtitle1">
              All your restroom(s) in one place
            </Typography>
          </Box>
          <Link to="/">
            <TertiaryButton sx={{ position: "absolute", top: 80, right: 0 }}>
              <CloseRoundedIcon />
            </TertiaryButton>
          </Link>
        </Container>
        <Container>
          {Array.isArray(savedRestrooms) &&
            savedRestrooms.map((restroom) => {
              return (
                <Card
                  sx={{
                    display: "flex",
                    my: 2,
                    width: 380,
                  }}
                  key={restroom.restroomId}
                >
                  <Link
                    to={`/restrooms/${restroom.restroomId}`}
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
                          key={restroom.restroom.name}
                          variant="subtitle1"
                          sx={{
                            fontWeight: "900",
                            color: crAppTheme.palette.primary.dark,
                          }}
                        >
                          {restroom.restroom.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: crAppTheme.palette.primary.dark }}
                        >
                          <b>Opening Hours</b>: {restroom.restroom.openingHours}
                        </Typography>
                        <br />
                        <Typography
                          variant="caption"
                          sx={{ color: crAppTheme.palette.primary.dark }}
                        >
                          <b>Description</b>: {restroom.restroom.description}
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
                          onClick={() => {
                            handleDeleteSavedRestroom(restroom.restroomId);
                          }}
                        >
                          Delete
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
                        src={restroom.restroom.imageUrl}
                        alt="Restroom"
                        sx={{ width: 80, height: 80 }}
                      />
                    </Box>
                  </Link>
                </Card>
              );
            })}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Saved;
