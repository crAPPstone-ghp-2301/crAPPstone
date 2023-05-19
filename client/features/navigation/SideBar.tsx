import * as React from "react";
import crAppTheme from "../../app/theme";
import { PrimaryButton, TertiaryButton } from "../styles/StyleGuide";
import {
  ThemeProvider,
  Avatar,
  Box,
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

const SideBar = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const user = useSelector((state) => state.auth.user);
  const { username } = useSelector((state) => state.auth.me);
  const isMobile = useMediaQuery("(max-width:900px)");

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
              <TertiaryButton
                onClick={isMobile ? handleDrawerToggle : true}
                sx={{
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "center",
                }}
              >
                <img
                  src="https://em-content.zobj.net/source/animated-noto-color-emoji/356/pile-of-poo_1f4a9.gif"
                  width="50px"
                />
                <Typography
                  variant="caption"
                  sx={{
                    textTransform: "none",
                    color: crAppTheme.palette.primary.dark,
                  }}
                >
                  crAPP
                </Typography>
              </TertiaryButton>
            </Link>
          </ListItem>
          <ListItem>
            <Link to="/saved">
              <TertiaryButton
                onClick={isMobile ? handleDrawerToggle : true}
                sx={{
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <BookmarkBorderRoundedIcon fontSize="large" />
                <Typography
                  variant="caption"
                  sx={{ textTransform: "capitalize" }}
                >
                  Saved
                </Typography>
              </TertiaryButton>
            </Link>
          </ListItem>
          {/* <ListItem>
            <TertiaryButton
              onClick={isMobile ? handleDrawerToggle : true}
              sx={{
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <HistoryRoundedIcon fontSize="large" />
              <Typography
                variant="caption"
                sx={{ textTransform: "capitalize" }}
              >
                History
              </Typography>
            </TertiaryButton>
          </ListItem> */}
        </List>
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: "auto",
          }}
        >
          <ListItem
            sx={{
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Link to="/login">
              {isLoggedIn ? (
                <Avatar>
                  <Typography sx={{ textTransform: "capitalize" }}>
                    {username[0]}
                  </Typography>
                </Avatar>
              ) : (
                <PrimaryButton
                  onClick={isMobile ? handleDrawerToggle : true}
                  sx={{ px: 1, py: 0.5 }}
                >
                  <Typography variant="caption">Sign In</Typography>
                </PrimaryButton>
              )}
            </Link>
          </ListItem>
          <TertiaryButton
            onClick={
              isMobile
                ? () => {
                    handleDrawerToggle();
                    setSettingsOpen(true);
                  }
                : toggleSettings
            }
          >
            <ListItem
              sx={{
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <SettingsRoundedIcon fontSize="large" />
              <Typography
                variant="caption"
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
        <Box id="mobile-sidebar">
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              borderRadius: "50%",
              width: 35,
              height: 35,
              position: "absolute",
              bottom: 30,
              left: 15,
              zIndex: 1,
              backgroundColor: crAppTheme.palette.primary.dark,
              color: crAppTheme.palette.primary.light,
              border: `1px solid ${crAppTheme.palette.primary.light}`,
            }}
          >
            <MenuRoundedIcon />
          </IconButton>
        </Box>
      )}
    </ThemeProvider>
  );
};

export default SideBar;
