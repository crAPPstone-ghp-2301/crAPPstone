import React from "react";
import crAppTheme from "../../app/theme";
import { TertiaryButton } from "../styles/StyleGuide";
import {
  ThemeProvider,
  Drawer,
  CssBaseline,
  ListItem,
  Typography,
  IconButton,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AddLocationAltRoundedIcon from "@mui/icons-material/AddLocationAltRounded";

const Settings = ({ open, onClose }) => {
  return (
    <>
      <ThemeProvider theme={crAppTheme}>
        <CssBaseline />
        <Drawer anchor="left" open={open} onClose={onClose}>
          <ListItem sx={{ justifyContent: "flex-end" }}>
            <IconButton onClick={onClose}>
              <CloseRoundedIcon />
            </IconButton>
          </ListItem>
          <ListItem>
            <Typography variant="h5">Settings</Typography>
          </ListItem>
          <ListItem>
            <AddLocationAltRoundedIcon />
            <Typography variant="subtitle1">Add Location</Typography>
          </ListItem>
        </Drawer>
      </ThemeProvider>
    </>
  );
};

export default Settings;
