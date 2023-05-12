import * as React from "react";
import crAppTheme from "../../app/theme";
import { PrimaryButton, TertiaryButton } from "../styles/StyleGuide";
import {
  ThemeProvider,
  Container,
  Drawer,
  List,
  ListItem,
  IconButton,
  useMediaQuery,
  CssBaseline,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Settings from "../settings/Settings";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import Settings from "../settings/Settings";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const user = useSelector((state) => state.auth.user);
  const isMobile = useMediaQuery("(max-width:700px)");

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

  React.useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [isLoggedIn, user]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
  };

  const toggleDialog = () => {
    setIsOpen(!isOpen);
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
            <Link to="/">
              <img
                src="https://em-content.zobj.net/source/animated-noto-color-emoji/356/pile-of-poo_1f4a9.gif"
                width="50px"
              />
            </Link>
            <Link to="/">
              <Typography
                variant="overline"
                sx={{
                  textTransform: "none",
                  color: crAppTheme.palette.primary.dark,
                }}
              >
                crAPP
              </Typography>
            </Link>
          </ListItem>
          <ListItem>
            <Link to='/saved'>
              <TertiaryButton
                sx={{
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <BookmarkBorderRoundedIcon fontSize="large" />
                <Typography
                  variant="overline"
                  sx={{ textTransform: "capitalize" }}
                >
                  Saved
                </Typography>
              </TertiaryButton>
            </Link>
          </ListItem>
          <ListItem>
            <TertiaryButton
              sx={{
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <HistoryRoundedIcon fontSize="large" />
              <Typography
                variant="overline"
                sx={{ textTransform: "capitalize" }}
              >
                History
              </Typography>
            </TertiaryButton>
          </ListItem>
        </List>
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        ></List>
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
            <Link to="/login">
              <PrimaryButton
                onClick={isMobile ? drawerOpen : false}
                sx={{ px: 1, py: 0.5 }}
              >
                <Typography variant="overline">
                  {isLoggedIn ? "Sign Out" : "Sign In"}
                </Typography>
              </PrimaryButton>
            </Link>
          </ListItem>
          <TertiaryButton onClick={toggleSettings}>
            <ListItem
              sx={{
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <SettingsRoundedIcon fontSize="large" />
              <Typography
                variant="overline"
                sx={{ textTransform: "capitalize" }}
              >
                Settings
              </Typography>
              <Settings
                open={settingsOpen}
                onClose={() => setSettingsOpen(false)}
              />
            </ListItem>
          </TertiaryButton>
        </List>
      </Drawer>
      {isMobile && (
        <Container
          id="sidebar"
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
