//save component

import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { selectSaved, addSavedRestroom, getSavedRestrooms } from "./saveSlice";
import { PrimaryButton, TertiaryButton } from "../styles/StyleGuide";
import crAppTheme from "../../app/theme";
import { Link } from "react-router-dom";
import {
  Typography,
  Container,
  Button,
  Box,
  Card,
  CardMedia,
  CardContent,
  ThemeProvider,
  CssBaseline
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const Saved = () => {
  const [savedRestrooms, setSavedRestrooms] = useState([])

  useEffect(() => {
    async function fetchSavedRestrooms() {
      try {
        const [savedRestroomsResponse, restroomsResponse] = await Promise.all([
          fetch("/api/saved"),
          fetch("/api/restrooms")
        ]);
        const savedRestrooms = await savedRestroomsResponse.json();
        const restrooms = await restroomsResponse.json();

        const restroomsById = {};
        restrooms.forEach(restroom => {
          restroomsById[restroom.id] = restroom;
        });

        const savedRestroomsWithDetails = savedRestrooms.map(savedRestroom => ({
          ...savedRestroom,
          restroom: restroomsById[savedRestroom.restroomId]
        }));

        setSavedRestrooms(savedRestroomsWithDetails);
      } catch (error) {
        console.log("Error fetching saved restrooms:", error);
      }
    }
    fetchSavedRestrooms();
  }, []);

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
            <Typography variant="h3">Saved Restrooms</Typography>
            <Typography variant="subtitle1">
              Your saved restrooms
            </Typography>
            {
              Array.isArray(savedRestrooms) && savedRestrooms.map((restroom) => {
                return <Link key={restroom.restroomId} to={`/restrooms/${restroom.restroomId}`}>
                  <Typography key={restroom.restroom.name}variant="subtitle1">{restroom.restroom.name}</Typography>
                </Link>
              })
            }
          </Box>
          <Link to="/">
            <TertiaryButton sx={{ position: "absolute", top: 0, right: 0 }}>
              <CloseRoundedIcon />
            </TertiaryButton>
          </Link>
        </Container>
      </Container>
    </ThemeProvider>
  )
}

export default Saved
