import * as React from "react";
import crAppTheme from "../../app/theme";
import {
  ThemeProvider,
  Container,
  Drawer,
  List,
  ListItem,
  IconButton,
  useMediaQuery,
  CssBaseline,
  Divider,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import SignIn from "./SignIn";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import AddLocationAltRoundedIcon from "@mui/icons-material/AddLocationAltRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

const SideBar = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  const isMobile = useMediaQuery("(max-width:700px)");

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <ThemeProvider theme={crAppTheme}>
      <CssBaseline />
      <Drawer
        variant={isMobile ? "temporary" : "persistent"}
        anchor="left"
        open={isMobile ? drawerOpen : true}
        onClose={handleDrawerToggle}
      >
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <ListItem
            sx={{
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <img
              src="https://em-content.zobj.net/source/animated-noto-color-emoji/356/pile-of-poo_1f4a9.gif"
              width="50px"
            />
            <Typography variant="overline" sx={{ textTransform: "none" }}>
              crAPP
            </Typography>
          </ListItem>
          <ListItem
            sx={{
              justifyContent: "center",
              my: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <BookmarkBorderRoundedIcon fontSize="large" />
            <Typography variant="overline" sx={{ textTransform: "capitalize" }}>
              Saved
            </Typography>
          </ListItem>
          <ListItem
            sx={{
              justifyContent: "center",
              my: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <HistoryRoundedIcon fontSize="large" />
            <Typography variant="overline" sx={{ textTransform: "capitalize" }}>
              History
            </Typography>
          </ListItem>
        </List>
        <Divider />
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <ListItem
            sx={{
              justifyContent: "center",
              my: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <AddLocationAltRoundedIcon fontSize="large" />
            <Typography variant="overline" sx={{ textTransform: "capitalize" }}>
              Add Restroom
            </Typography>
          </ListItem>
        </List>
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: "auto",
            mb: 2,
          }}
        >
          <ListItem
            sx={{
              justifyContent: "center",
              my: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <SignIn />
          </ListItem>
          <ListItem
            sx={{
              justifyContent: "center",
              my: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <SettingsRoundedIcon fontSize="large" />
            <Typography variant="overline" sx={{ textTransform: "capitalize" }}>
              Settings
            </Typography>
          </ListItem>
        </List>
      </Drawer>
      {isMobile && (
        <Container
          sx={{
            position: "absolute",
            top: 20,
            left: 10,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 1,
            width: "92%",
          }}
        >
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              borderRadius: "50%",
              width: 35,
              height: 35,
              backgroundColor: crAppTheme.palette.primary.main,
              color: crAppTheme.palette.text.secondary,
            }}
          >
            <MenuRoundedIcon />
          </IconButton>
        </Container>
      )}
    </ThemeProvider>
  );
};

export default SideBar;
