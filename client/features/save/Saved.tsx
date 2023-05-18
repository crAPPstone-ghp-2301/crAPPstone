import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
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
import { Link, useNavigate } from "react-router-dom";
import {
  Typography,
  Container,
  Box,
  ThemeProvider,
  CssBaseline,
  Card,
  CardContent,
  CardMedia,
  useMediaQuery,
  Fab,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import NoteAddRoundedIcon from "@mui/icons-material/NoteAddRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";

const Saved = () => {
  const navigate = useNavigate();
  const [savedRestrooms, setSavedRestrooms] = useState([]);
  const { id } = useSelector((state) => state.auth.me);
  const token = window.localStorage.getItem("token");
  const isMobile = useMediaQuery("(max-width:1000px)");

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
    navigate("/saved");
  };

  useEffect(() => {
    document.title = `Saved Restrooms - crAPP the Map`;
    const handleClickOutside = (event) => {
      const container = document.getElementById("saved-container");
      if (container && !container.contains(event.target)) {
        navigate("/");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const ref = useRef();

  const [pos, setPos] = useState(false);

  const handleTop = () => {
    ref.current.scrollTop = 0;
    setPos(false);
  };

  const handleScroll = () => {
    if (ref.current.scrollTop > 50) {
      if (!pos) setPos(true);
    } else {
      if (pos) setPos(false);
    }
  };

  useEffect(() => {
    const temp = ref.current;
    temp.addEventListener("scroll", handleScroll);
    return () => temp.removeEventListener("scroll", handleScroll);
  });

  return (
    <ThemeProvider theme={crAppTheme}>
      <CssBaseline />
      <Box
        id="saved-container"
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
        ref={ref}
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
            <Typography variant="h3">Saved Restrooms</Typography>
            <Typography variant="subtitle1">
              All your restroom(s) in one place
            </Typography>
          </Box>
          <Link to="/">
            <TertiaryButton sx={{ position: "absolute", top: 0, right: 0 }}>
              <CloseRoundedIcon />
            </TertiaryButton>
          </Link>
        </Container>
        <Container>
          {Array.isArray(savedRestrooms) && savedRestrooms.length > 0 ? (
            savedRestrooms.map((restroom) => {
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
                  key={restroom.restroomId}
                >
                  <Link
                    to={`/restrooms/${restroom.restroomId}`}
                    style={{ display: "flex" }}
                  >
                    <Box
                      sx={{
                        flex: "1 1 auto",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CardContent sx={{ flex: "1 0 auto" }}>
                        <Box>
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
                        </Box>
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{ color: crAppTheme.palette.primary.dark }}
                          >
                            <b>Opening Hours</b>:{" "}
                            {restroom.restroom.openingHours}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{
                              color: crAppTheme.palette.primary.dark,
                            }}
                          >
                            <b>Address</b>: {restroom.restroom.address}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{
                              color: crAppTheme.palette.primary.dark,
                            }}
                          >
                            <b>Description</b>: {restroom.restroom.description}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Box>
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
                        src={restroom.restroom.imageUrl}
                        alt="Restroom"
                        sx={{ width: 80, height: 80 }}
                      />
                      <SecondaryButton sx={{ my: 1 }}>
                        <NoteAddRoundedIcon fontSize="small" /> Review
                      </SecondaryButton>
                      <SecondaryButton
                        sx={{ my: 1 }}
                        onClick={() => {
                          handleDeleteSavedRestroom(restroom.restroomId);
                        }}
                      >
                        <DeleteRoundedIcon fontSize="small" />
                        Delete
                      </SecondaryButton>
                    </Box>
                  </Link>
                </Card>
              );
            })
          ) : (
            <Box sx={{ my: isMobile ? 5 : 10, textAlign: "center" }}>
              <Typography variant="body1" sx={{ my: 5 }}>
                <b>No saved restrooms!</b>
              </Typography>
              <Typography variant="subtitle1">Friendly reminder:</Typography>
              <Link to="/login">
                <SecondaryButton>
                  <Typography variant="subtitle1">
                    Sign in to save your restrooms
                  </Typography>
                </SecondaryButton>
              </Link>
              <Link to="/">
                <TertiaryButton sx={{ my: isMobile ? 4 : 8 }}>
                  <Typography variant="subtitle1">
                    Start exploring crAPP
                  </Typography>
                </TertiaryButton>
              </Link>
              <Box sx={{ my: 2 }}>
                <Typography variant="subtitle1">
                  Not sure what to do?
                </Typography>
                <Link to="/help">
                  <SecondaryButton>
                    <Typography variant="subtitle1">Get Help</Typography>
                  </SecondaryButton>
                </Link>
              </Box>
            </Box>
          )}
          <Fab
            color="primary"
            aria-label="scroll-to-top"
            onClick={handleTop}
            sx={{
              position: "fixed",
              bottom: 10,
              left: isMobile ? 0 : "300px",
              display: pos ? "block" : "none",
            }}
          >
            <KeyboardArrowUpRoundedIcon />
          </Fab>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Saved;
