//save component

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { selectSaved, addSavedRestroom } from "./saveSlice";
import { PrimaryButton, TertiaryButton } from "../styles/StyleGuide";
import crAppTheme from "../../app/theme";
import { Link } from "react-router-dom";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Typography,
  Box,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const Saved = () => {
  const dispatch = useDispatch()
  const savedRestrooms = useSelector(selectSaved)


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
                <Link to={`/restrooms/${restroom.id}`}/>
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
