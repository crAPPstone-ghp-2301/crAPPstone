import * as React from "react";
import crAppTheme from "../../app/theme";
import {
  ThemeProvider,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  IconButton,
  useMediaQuery,
  CssBaseline,
  Divider,
  Typography,
} from "@mui/material";
import SignIn from "./SignIn";
import { PrimaryButton, TertiaryButton } from "../styles/StyleGuide";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";

const SideBar = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  const isMobile = useMediaQuery("(max-width:600px)");

  const toggleDialog = () => {
    setIsOpen(!isOpen);
  };
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <ThemeProvider theme={crAppTheme}>
      <CssBaseline />
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "transparent",
        }}
      >
        {isMobile ? (
          <>
            <IconButton onClick={handleDrawerToggle}>
              <MenuRoundedIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={handleDrawerToggle}
            >
              <List>
                <ListItem>
                  <ListItemIcon>test </ListItemIcon>
                </ListItem>
                <ListItem>
                  <ListItemIcon>test</ListItemIcon>
                </ListItem>
              </List>
            </Drawer>
          </>
        ) : (
          <Drawer variant="persistent" anchor="left" open={true}>
            <List
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <ListItem sx={{ justifyContent: "center", my: 1 }}>
                <MenuRoundedIcon fontSize="large" />
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
                <Typography
                  variant="overline"
                  sx={{ textTransform: "capitalize" }}
                >
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
                <Typography
                  variant="overline"
                  sx={{ textTransform: "capitalize" }}
                >
                  History
                </Typography>
              </ListItem>
              <Divider />
              <ListItem sx={{ justifyContent: "center", my: 1 }}>
                <SignIn />
              </ListItem>
            </List>
          </Drawer>
        )}
        <SignIn />
      </Container>
    </ThemeProvider>
  );
};

export default SideBar;
