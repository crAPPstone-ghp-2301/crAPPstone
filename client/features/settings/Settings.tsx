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
  Divider,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AddLocationAltRoundedIcon from "@mui/icons-material/AddLocationAltRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import ReviewsRoundedIcon from "@mui/icons-material/ReviewsRounded";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import Saved from "../save/Saved";

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
          <Container sx={{ px: 0.5 }}>
            <ListItem>
              <Typography variant="h5">Settings</Typography>
            </ListItem>
          </Container>
          <Divider />
          <Container sx={{ py: 2 }}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <Link to='/saved'>
                    <BookmarkBorderRoundedIcon fontSize="small" />
                  </Link>
                </Avatar>
              </ListItemAvatar>
              <Typography variant="subtitle1">Saved</Typography>
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <HistoryRoundedIcon fontSize="small" />
                </Avatar>
              </ListItemAvatar>
              <Typography variant="subtitle1">History</Typography>
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ReviewsRoundedIcon fontSize="small" />
                </Avatar>
              </ListItemAvatar>
              <Typography variant="subtitle1">Your Reviews</Typography>
            </ListItem>
          </Container>
          <Divider />
          <Container sx={{ py: 2 }}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <LinkRoundedIcon fontSize="small" />
                </Avatar>
              </ListItemAvatar>
              <Typography variant="subtitle1">Share Map</Typography>
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AddLocationAltRoundedIcon fontSize="small" />
                </Avatar>
              </ListItemAvatar>
              <Typography variant="subtitle1">Add Location</Typography>
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AccountCircleRoundedIcon fontSize="small" />
                </Avatar>
              </ListItemAvatar>
              <Typography variant="subtitle1">Edit Profile</Typography>
            </ListItem>
          </Container>
          <Divider />
          <Container sx={{ py: 2 }}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <InfoRoundedIcon fontSize="small" />
                </Avatar>
              </ListItemAvatar>
              <Typography variant="subtitle1">Help</Typography>
            </ListItem>
          </Container>
        </Drawer>
      </ThemeProvider>
    </>
  );
};

export default Settings;
