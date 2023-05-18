import * as React from "react";
import crAppTheme from "../../app/theme";
import { TertiaryButton } from "../styles/StyleGuide";
import { Link } from "react-router-dom";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Box,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

export default function Help() {
  const isMobile = useMediaQuery("(max-width:900px)");

  return (
    <ThemeProvider theme={crAppTheme}>
      <CssBaseline />
      <Container
        id="edit-profile-container"
        sx={{
          position: isMobile ? "absolute" : "fixed",
          top: 0,
          left: isMobile ? 0 : "100px",
          zIndex: isMobile ? 2 : 1,
          backgroundColor: "white",
          width: isMobile ? "100%" : 450,
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
          }}
        >
          <Box sx={{ py: 1, marginBottom: 4 }}>
            <Typography variant="h3">
              Welcome to the crAPP Help Center
            </Typography>
          </Box>
          <Link to="/">
            <TertiaryButton sx={{ position: "absolute", top: 0, right: 0 }}>
              <CloseRoundedIcon />
            </TertiaryButton>
          </Link>
          <Accordion
            sx={{
              border: `1px solid ${crAppTheme.palette.primary.dark}`,
              my: 1,
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h5">Introduction</Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{ backgroundColor: crAppTheme.palette.primary.light }}
            >
              <Typography variant="subtitle1">
                Welcome to crAPP the Map! Our app is designed to help you
                navigate and explore your surroundings with ease. Whether you're
                looking for directions, marking important locations, or finding
                interesting places nearby, crAPP the Map has got you covered.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{
              border: `1px solid ${crAppTheme.palette.primary.dark}`,
              my: 1,
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h5">Getting Started</Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{ backgroundColor: crAppTheme.palette.primary.light }}
            >
              <Typography variant="subtitle1" sx={{ paddingBottom: 2 }}>
                Create an Account
                <span style={{ paddingLeft: 4, paddingRight: 4 }}>
                  <Link to="/signup">
                    <OpenInNewRoundedIcon />
                  </Link>
                </span>
                or sign in with your account
                <span style={{ paddingLeft: 4, paddingRight: 4 }}>
                  <Link to="/login">
                    <OpenInNewRoundedIcon />
                  </Link>
                </span>
              </Typography>
              <Typography variant="subtitle1">
                While you can view restroom information, for the best experience
                you will need to create an account or sign in with your account
                in order to review, rate, and save restrooms to your personal
                profile
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{
              border: `1px solid ${crAppTheme.palette.primary.dark}`,
              my: 1,
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h5">User Interface Overview</Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{ backgroundColor: crAppTheme.palette.primary.light }}
            >
              <Typography variant="subtitle1" sx={{ paddingBottom: 2 }}>
                The user interface of crAPP the Map consists of the following
                key conponents
              </Typography>
              <Typography variant="subtitle1">
                1. Map View: The main screen where you can see the map and your
                current location. (We are currently in beta and only showing
                restroom information in NYC)
              </Typography>
              <Typography variant="subtitle1">
                2. Buttons and Menus: Various buttons and menus that provide
                access to different features and options
              </Typography>
              <Typography variant="subtitle1">
                3. Search Bar: A search bar to find specific places
              </Typography>
              <Typography variant="subtitle1">
                4. Markers: Icons or pins that identify different types of
                restrooms in your location
              </Typography>
              <Typography variant="subtitle1" sx={{ paddingTop: 2 }}>
                Each element serves a specific purpose and provides
                functionality to enhace your map experience
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{
              border: `1px solid ${crAppTheme.palette.primary.dark}`,
              my: 1,
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h5">Finding Places of Interest</Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{ backgroundColor: crAppTheme.palette.primary.light }}
            >
              <Typography variant="subtitle1" sx={{ paddingBottom: 2 }}>
                Finding a restroom or points of interest is a breeze with crAPP
                the Map. Here's how you can do it:
              </Typography>
              <Typography variant="subtitle1">
                1. Use the search bar at the top of the screen.
              </Typography>
              <Typography variant="subtitle1">
                2. Enter the name or category of the place you're looking for
                (e.g., "coffee shop" or "museum").
              </Typography>
              <Typography variant="subtitle1">
                3. The app will display relevant results based on your search
                query.
              </Typography>
              <Typography variant="subtitle1">
                4. You can further refine your search by applying filters or
                selecting specific categories.
              </Typography>
              <Typography variant="subtitle1" sx={{ paddingTop: 2 }}>
                Discover new places and explore your surroundings with ease
                using our powerful search feature.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            sx={{
              border: `1px solid ${crAppTheme.palette.primary.dark}`,
              my: 1,
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h5">Give Feedback</Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{ backgroundColor: crAppTheme.palette.primary.light }}
            >
              <Typography variant="subtitle1" sx={{ paddingBottom: 2 }}>
                Form will open in a new window{" "}
                <span style={{ paddingLeft: 4, paddingRight: 4 }}>
                  <a href="https://forms.gle/VEVg2ZZbKBEiNTSE6" target="_blank">
                    <OpenInNewRoundedIcon />
                  </a>
                </span>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Container>
      </Container>
    </ThemeProvider>
  );
}
