import React from "react";
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
} from "@mui/material";
import SignIn from "./SignIn";
import MenuIcon from "@mui/icons-material/Menu";

const SideBar = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

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
              <MenuIcon />
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
            <List>
              <ListItem>
                <ListItemIcon>test </ListItemIcon>
              </ListItem>
              <ListItem>
                <ListItemIcon>test </ListItemIcon>
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
