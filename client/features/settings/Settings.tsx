import React, { useState } from "react";
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
  Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AddLocationAltRoundedIcon from "@mui/icons-material/AddLocationAltRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import ReviewsRoundedIcon from "@mui/icons-material/ReviewsRounded";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";

const Settings = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const isLoggedIn = useSelector((state) => {
    const { me, authToken } = state.auth;
    const storedAuthToken = localStorage.getItem("authToken");
    const storedUserId = sessionStorage.getItem("userId");
    return (
      me.id ||
      (authToken && storedAuthToken === authToken) ||
      (storedUserId && me.id === storedUserId)
    );
  });

  return (
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
        <Container>
          <ListItem>
            <Typography variant="h5">Settings</Typography>
          </ListItem>
        </Container>
        <Divider />
        <Box>
          <ListItem>
            <Link to="/saved">
              <TertiaryButton>
                <ListItemAvatar>
                  <Avatar
                    sx={{ backgroundColor: crAppTheme.palette.primary.dark }}
                  >
                    <BookmarkBorderRoundedIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <Typography variant="subtitle2">Saved</Typography>
              </TertiaryButton>
            </Link>
          </ListItem>
          <ListItem>
            <TertiaryButton>
              <ListItemAvatar>
                <Avatar
                  sx={{ backgroundColor: crAppTheme.palette.primary.dark }}
                >
                  <HistoryRoundedIcon fontSize="small" />
                </Avatar>
              </ListItemAvatar>
              <Typography variant="subtitle2">History</Typography>
            </TertiaryButton>
          </ListItem>
          <ListItem>
            <TertiaryButton>
              <ListItemAvatar>
                <Avatar
                  sx={{ backgroundColor: crAppTheme.palette.primary.dark }}
                >
                  <ReviewsRoundedIcon fontSize="small" />
                </Avatar>
              </ListItemAvatar>
              <Typography variant="subtitle2">Your Reviews</Typography>
            </TertiaryButton>
          </ListItem>
        </Box>
        <Divider />
        <Box>
          <ListItem>
            <TertiaryButton>
              <ListItemAvatar>
                <Avatar
                  sx={{ backgroundColor: crAppTheme.palette.primary.dark }}
                >
                  <LinkRoundedIcon fontSize="small" />
                </Avatar>
              </ListItemAvatar>
              <Typography variant="subtitle2">Share Map</Typography>
            </TertiaryButton>
          </ListItem>
          <ListItem>
            <TertiaryButton>
              <ListItemAvatar>
                <Avatar
                  sx={{ backgroundColor: crAppTheme.palette.primary.dark }}
                >
                  <AddLocationAltRoundedIcon fontSize="small" />
                </Avatar>
              </ListItemAvatar>
              <Typography variant="subtitle2">Add Location</Typography>
            </TertiaryButton>
          </ListItem>
          <ListItem>
            <Link to={!isLoggedIn ? "/login" : "/profile"}>
              <TertiaryButton>
                <ListItemAvatar>
                  <Avatar
                    sx={{ backgroundColor: crAppTheme.palette.primary.dark }}
                  >
                    <AccountCircleRoundedIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <Typography variant="subtitle2">Edit Profile</Typography>
              </TertiaryButton>
            </Link>
          </ListItem>
        </Box>
        <Divider />
        <Box>
          <Link to="/help">
            <ListItem>
              <TertiaryButton>
                <ListItemAvatar>
                  <Avatar
                    sx={{ backgroundColor: crAppTheme.palette.primary.dark }}
                  >
                    <InfoRoundedIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <Typography variant="subtitle2">Help</Typography>
              </TertiaryButton>
            </ListItem>
          </Link>
        </Box>
      </Drawer>
    </ThemeProvider>
  );
};

export default Settings;
