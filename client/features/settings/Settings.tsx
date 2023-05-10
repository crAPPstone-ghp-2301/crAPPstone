import React from "react";
import crAppTheme from "../../app/theme";
import { TertiaryButton } from "../styles/StyleGuide";
import {
  ThemeProvider,
  Drawer,
  CssBaseline,
  ListItem,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AddLocationAltRoundedIcon from "@mui/icons-material/AddLocationAltRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";

const Settings = ({ open, onClose }) => {
  return (
    <>
      <ThemeProvider theme={crAppTheme}>
        <CssBaseline />
        <Drawer
          open={open}
          onClose={onClose}
          ModalProps={{
            BackdropProps: {
              onClick: () => {},
            },
          }}
        >
          <TertiaryButton
            onClick={onClose}
            sx={{ position: "absolute", top: 0, right: 0 }}
          >
            <CloseRoundedIcon />
          </TertiaryButton>
          <ListItem>
            <Typography variant="h5">Settings</Typography>
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AccountCircleRoundedIcon />
              </Avatar>
            </ListItemAvatar>
            <Typography variant="subtitle1">Edit Profile</Typography>
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <BookmarkBorderRoundedIcon />
              </Avatar>
            </ListItemAvatar>
            <Typography variant="subtitle1">Saved</Typography>
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <HistoryRoundedIcon />
              </Avatar>
            </ListItemAvatar>
            <Typography variant="subtitle1">History</Typography>
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AddLocationAltRoundedIcon />
              </Avatar>
            </ListItemAvatar>
            <Typography variant="subtitle1">Add Location</Typography>
          </ListItem>
        </Drawer>
      </ThemeProvider>
    </>
  );
};

export default Settings;
