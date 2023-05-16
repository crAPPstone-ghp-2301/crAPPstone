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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export default function Help() {
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
          width: 450,
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
            marginTop: 10,
            py: 2,
          }}
        >
          <Box sx={{ py: 1 }}>
            <Typography variant="h3">Help</Typography>
            <Typography variant="subtitle1">Resources for crAPP </Typography>
          </Box>
          <Link to="/">
            <TertiaryButton sx={{ position: "absolute", top: 80, right: 0 }}>
              <CloseRoundedIcon />
            </TertiaryButton>
          </Link>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Accordion 1</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Accordion 2</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Container>
      </Container>
    </ThemeProvider>
  );
}
