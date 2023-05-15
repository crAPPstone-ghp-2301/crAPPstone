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
import Saved from "../save/Saved";

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

  const handleButtonClick = (buttonAction) => {
    if (isLoggedIn) {
      buttonAction();
    } else {
      navigate("/login");
      setIsOpen(true);
    }
  };

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
        <Container sx={{ px: 0.5 }}>
          <ListItem>
            <Typography variant="h5">Settings</Typography>
          </ListItem>
        </Container>
        <Divider />
        <Container>
          <ListItem>
            <TertiaryButton
              onClick={() =>
                handleButtonClick(() => console.log("Saved button clicked"))
              }
            >
              <ListItemAvatar>
                <Avatar>
                  <Link to="/saved">
                    <BookmarkBorderRoundedIcon fontSize="small" />
                  </Link>
                </Avatar>
              </ListItemAvatar>
              <Typography variant="subtitle1">Saved</Typography>
            </TertiaryButton>
          </ListItem>
          <ListItem>
            <TertiaryButton>
              <ListItemAvatar>
                <Avatar>
                  <HistoryRoundedIcon fontSize="small" />
                </Avatar>
              </ListItemAvatar>
              <Typography variant="subtitle1">History</Typography>
            </TertiaryButton>
          </ListItem>
          <ListItem>
            <TertiaryButton>
              <ListItemAvatar>
                <Avatar>
                  <ReviewsRoundedIcon fontSize="small" />
                </Avatar>
              </ListItemAvatar>
              <Typography variant="subtitle1">Your Reviews</Typography>
            </TertiaryButton>
          </ListItem>
        </Container>
        <Divider />
        <Container>
          <ListItem>
            <TertiaryButton>
              <ListItemAvatar>
                <Avatar>
                  <LinkRoundedIcon fontSize="small" />
                </Avatar>
              </ListItemAvatar>
              <Typography variant="subtitle1">Share Map</Typography>
            </TertiaryButton>
          </ListItem>
          <ListItem>
            <TertiaryButton>
              <ListItemAvatar>
                <Avatar>
                  <AddLocationAltRoundedIcon fontSize="small" />
                </Avatar>
              </ListItemAvatar>
              <Typography variant="subtitle1">Add Location</Typography>
            </TertiaryButton>
          </ListItem>
          <ListItem>
            <Link to={!isLoggedIn ? "/login" : "/profile"}>
              <TertiaryButton>
                <ListItemAvatar>
                  <Avatar>
                    <AccountCircleRoundedIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <Typography variant="subtitle1">Edit Profile</Typography>
              </TertiaryButton>
            </Link>
          </ListItem>
        </Container>
        <Divider />
        <Container>
          <ListItem>
            <TertiaryButton>
              <ListItemAvatar>
                <Avatar>
                  <InfoRoundedIcon fontSize="small" />
                </Avatar>
              </ListItemAvatar>
              <Typography variant="subtitle1">Help</Typography>
            </TertiaryButton>
          </ListItem>
        </Container>
      </Drawer>
    </ThemeProvider>
  );
};

export default Settings;
