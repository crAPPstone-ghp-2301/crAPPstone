import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import crAppTheme from "../../app/theme";
import { SecondaryButton, TertiaryButton } from "../styles/StyleGuide";
import { getAllRestrooms, selectRestroom } from "./allRestroomSlice";
import { addSavedRestroom } from "../save/saveSlice";
import {
  ThemeProvider,
  Typography,
  Container,
  Box,
  Card,
  CardMedia,
  CardContent,
  CssBaseline,
  useMediaQuery,
  Fab,
} from "@mui/material";
import BookmarkAddRoundedIcon from "@mui/icons-material/BookmarkAddRounded";
import NoteAddRoundedIcon from "@mui/icons-material/NoteAddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";

const AllRestrooms = () => {
  const restrooms = useSelector(selectRestroom);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:1000px)");

  useEffect(() => {
    dispatch(getAllRestrooms());
  }, [dispatch]);

  const handleAddSavedRestroom = async (restroomId) => {
    console.log("restroom id", restroomId);
    await dispatch(addSavedRestroom(restroomId));
  };

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      const container = document.getElementById("restroom-container");
      if (container && !container.contains(event.target)) {
        navigate("/");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navigate]);

  return (
    <ThemeProvider theme={crAppTheme}>
      <CssBaseline />
      <Box
        id="restroom-container"
        sx={{
          position: "fixed",
          top: 0,
          left: isMobile ? 0 : "100px",
          zIndex: isMobile ? 2 : 1,
          backgroundColor: "white",
          width: isMobile ? "100%" : 450,
          height: "100%",
          overflowY: "scroll",
          paddingBottom: 10,
          scrollBehavior: "smooth",
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
          "&::-webkit-scrollbar-thumb:vertical": {
            minHeight: "30px",
          },
          "&::-webkit-scrollbar-thumb:vertical:active": {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
          "&::-webkit-scrollbar-thumb:vertical:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
          "&::-webkit-scrollbar-thumb:horizontal": {
            minWidth: "30px",
          },
          "&::-webkit-scrollbar-thumb:horizontal:active": {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
          "&::-webkit-scrollbar-thumb:horizontal:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
          "&::-webkit-scrollbar-corner": {
            backgroundColor: "transparent",
          },
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            p: 2,
          }}
        >
          <Box sx={{ p: 1 }}>
            <Typography variant="h3">All Restrooms</Typography>
            <Link to="/">
              <TertiaryButton sx={{ position: "absolute", top: 0, right: 0 }}>
                <CloseRoundedIcon />
              </TertiaryButton>
            </Link>
          </Box>
          <Box>
            {Array.isArray(restrooms) &&
              restrooms.map((restroom) => {
                return (
                  <Card
                    sx={{
                      display: "flex",
                      my: 2,
                      p: 1,
                      width: isMobile ? "100%" : 380,
                      transition: "box-shadow 0.3s",
                      "&:hover": {
                        backgroundColor: crAppTheme.palette.primary.main,
                        outline: `2px solid ${crAppTheme.palette.primary.dark}}`,
                      },
                    }}
                    key={restroom.id}
                  >
                    <Link
                      to={`/restrooms/${restroom.id}`}
                      style={{ display: "flex" }}
                    >
                      <Box
                        sx={{
                          flex: "1 1 auto",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <CardContent
                          sx={{
                            flex: "1 1 auto",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
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
                            variant="body2"
                            sx={{ color: crAppTheme.palette.primary.dark }}
                          >
                            <b>Opening Hours</b>: {restroom.openingHours}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: crAppTheme.palette.primary.dark }}
                          >
                            <b>Address</b>: {restroom.address}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: crAppTheme.palette.primary.dark }}
                          >
                            <b>Description</b>: {restroom.description}
                          </Typography>
                        </CardContent>
                      </Box>
                    </Link>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        pl: 2,
                      }}
                    >
                      <CardMedia
                        component="img"
                        src={restroom.imageUrl}
                        alt="Restroom"
                        sx={{ width: 80, height: 80 }}
                      />

                      <SecondaryButton sx={{ my: 1 }}>
                        <Typography variant="body2">
                          <NoteAddRoundedIcon fontSize="small" /> Review
                        </Typography>
                      </SecondaryButton>
                      <SecondaryButton
                        sx={{ my: 1 }}
                        onClick={
                          isLoggedIn
                            ? () => handleAddSavedRestroom(restroom.id)
                            : () => navigate("/login")
                        }
                      >
                        <Typography variant="body2">
                          <BookmarkAddRoundedIcon fontSize="small" />
                          Save
                        </Typography>
                      </SecondaryButton>
                    </Box>
                  </Card>
                );
              })}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default AllRestrooms;
