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
import SignIn from "./SignIn";
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
      <Drawer
        variant="persistent"
        anchor="left"
        open={isMobile ? drawerOpen : true}
        onClose={handleDrawerToggle}
      >
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
          <Divider />
          <ListItem sx={{ justifyContent: "center", my: 1 }}>
            <SignIn />
          </ListItem>
        </List>
      </Drawer>
      {isMobile && (
        <Container
          sx={{
            position: "absolute",
            top: 10,
            left: 0,
          }}
        >
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              borderRadius: 20,
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