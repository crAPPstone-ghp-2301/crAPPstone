import * as React from "react";
import {
  ThemeProvider,
  CssBaseline,
  Typography,
  Container,
  Box,
  Button,
  Paper,
  InputBase,
  Divider,
  IconButton,
  TextField,
  MenuItem,
  Input,
  InputLabel,
  FormControl,
  InputAdornment,
  Rating,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItem,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import crAppTheme from "../../app/theme";

// Primary button
const PrimaryButton = styled(Button)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.dark}`,
  backgroundColor: `${theme.palette.primary.dark}`,
  color: `${theme.palette.primary.main}`,
  borderRadius: 20,
  fontWeight: 600,
  textTransform: "capitalize",
  margin: 4,
  padding: "10px 40px",
  "&:hover": {
    boxShadow: "1px 1px 2.5px rgba(0, 0, 0, 0.5)",
    backgroundColor: `${theme.palette.primary.dark}`,
    color: `${theme.palette.primary.main}`,
  },
  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
}));

// Secondary button
const SecondaryButton = styled(Button)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.dark}`,
  color: `${theme.palette.primary.dark}`,
  borderRadius: 20,
  fontWeight: 500,
  textTransform: "capitalize",
  margin: 4,
  padding: "5px 20px",
  "&:hover": {
    boxShadow: "1px 1px 2.5px rgba(0, 0, 0, 0.5)",
    backgroundColor: `${theme.palette.primary.light}`,
    color: `${theme.palette.primary.dark}`,
  },
  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
}));

// Tertiary button
const TertiaryButton = styled(Button)(({ theme }) => ({
  color: `${theme.palette.primary.dark}`,
  fontWeight: 400,
  textTransform: "capitalize",
  margin: 4,
  padding: "5px 10px",
  "&:hover": {
    backgroundColor: `${theme.palette.primary.light}`,
    color: `${theme.palette.primary.dark}`,
  },
  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
}));

const CustomizedInputBase = styled(Paper)(({ theme }) => ({
  padding: "2px 4px",
  display: "flex",
  alignItems: "center",
  width: 400,
  border: `1px solid ${theme.palette.primary.dark}`,
  borderRadius: 20,
  margin: 4,
  "&:hover": {
    boxShadow: "1px 1px 2.5px rgba(0, 0, 0, 0.5)",
  },
}));

const CustomizedInput = styled(InputBase)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  flex: 1,
}));

const CustomizedIconButton = styled(IconButton)(({ theme }) => ({
  padding: "10px",
  color: `${theme.palette.primary.dark}`,
}));

const CustomizedTextField = styled(TextField)(({ theme }) => ({
  color: `${theme.palette.primary.dark}`,
  margin: 10,
  "& .MuiInputBase-input:focus": {
    color: `${theme.palette.primary.dark}`,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: `${theme.palette.primary.dark}`,
  },
  "& .MuiInputLabel-root": {
    color: `${theme.palette.primary.dark}`,
  },
}));

const PaletteBox = styled(Box)({
  display: "flex",
  margin: 2,
  alignItems: "center",
  justifyContent: "center",
  border: `1px solid ${crAppTheme.palette.primary.light}`,
  width: "50rem",
  textAlign: "center",
  textTransform: "uppercase",
});

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconEmpty .MuiSvgIcon-root": {
    color: theme.palette.action.disabled,
  },
}));

const customIcons = {
  1: {
    icon: <EmojiEmotionsIcon color="error" />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <EmojiEmotionsIcon color="error" />,
    label: "Dissatisfied",
  },
  3: {
    icon: <EmojiEmotionsIcon color="warning" />,
    label: "Neutral",
  },
  4: {
    icon: <EmojiEmotionsIcon color="success" />,
    label: "Satisfied",
  },
  5: {
    icon: <EmojiEmotionsIcon color="success" />,
    label: "Very Satisfied",
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

const StyleGuide = () => {
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <ThemeProvider theme={crAppTheme}>
      <CssBaseline />
      <Container
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
          width: "100%",
          height: "100%",
          alignItems: "center",
          alignContent: "center",
          backgroundColor: `${crAppTheme.palette.primary.main}`,
          color: `${crAppTheme.palette.text.primary}`,
          my: 10,
        }}
      >
        <Typography variant="h1" sx={{ textAlign: "center" }}>
          crAPP's Style Guide
        </Typography>

        <Typography variant="h5" sx={{ textAlign: "center", margin: 2 }}>
          Color Palette
        </Typography>
        <Container
          sx={{
            width: "70%",
            padding: 3,
            border: `1px dashed ${crAppTheme.palette.primary.light}`,
          }}
        >
          <Typography sx={{ textAlign: "center" }}>Light Theme</Typography>
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <PaletteBox
              sx={{ backgroundColor: crAppTheme.palette.primary.main }}
            >
              <Typography variant="overline" sx={{ textAlign: "center" }}>
                Main {crAppTheme.palette.primary.main}
              </Typography>
            </PaletteBox>
            <PaletteBox
              sx={{
                backgroundColor: `${crAppTheme.palette.primary.light}`,
              }}
            >
              <Typography variant="overline">
                Light {crAppTheme.palette.primary.light}
              </Typography>
            </PaletteBox>
            <PaletteBox
              sx={{
                backgroundColor: `${crAppTheme.palette.primary.dark}`,
              }}
            >
              <Typography variant="overline">
                Dark {crAppTheme.palette.primary.dark}
              </Typography>
            </PaletteBox>
          </Container>
          <Typography sx={{ textAlign: "center" }}>Dark Theme</Typography>
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <PaletteBox
              sx={{ backgroundColor: crAppTheme.palette.secondary.main }}
            >
              <Typography variant="overline" sx={{ textAlign: "center" }}>
                Main {crAppTheme.palette.secondary.main}
              </Typography>
            </PaletteBox>
            <PaletteBox
              sx={{
                backgroundColor: `${crAppTheme.palette.secondary.light}`,
              }}
            >
              <Typography variant="overline">
                Light {crAppTheme.palette.secondary.light}
              </Typography>
            </PaletteBox>
            <PaletteBox
              sx={{
                backgroundColor: `${crAppTheme.palette.secondary.dark}`,
              }}
            >
              <Typography variant="overline">
                Dark {crAppTheme.palette.secondary.dark}
              </Typography>
            </PaletteBox>
          </Container>
          <Typography sx={{ textAlign: "center" }}>Status Colors</Typography>
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <PaletteBox
              sx={{
                backgroundColor: crAppTheme.palette.error.main,
              }}
            >
              <Typography variant="overline">
                Error {crAppTheme.palette.error.main}
              </Typography>
            </PaletteBox>
            <PaletteBox
              sx={{
                backgroundColor: crAppTheme.palette.warning.main,
              }}
            >
              <Typography variant="overline">
                Warning {crAppTheme.palette.warning.main}
              </Typography>
            </PaletteBox>
            <PaletteBox
              sx={{
                backgroundColor: crAppTheme.palette.success.main,
              }}
            >
              <Typography variant="overline">
                Success {crAppTheme.palette.success.main}
              </Typography>
            </PaletteBox>
          </Container>
        </Container>

        <Typography variant="h5" sx={{ textAlign: "center", margin: 2 }}>
          Fonts
        </Typography>
        <Container
          sx={{
            width: "70%",
            padding: 3,
            border: `1px dashed ${crAppTheme.palette.primary.light}`,
          }}
        >
          <Box sx={{ textTransform: "capitalize", textAlign: "center" }}>
            <Typography variant="h1">Heading 1: viverra</Typography>
          </Box>
          <Box sx={{ textTransform: "capitalize", textAlign: "center" }}>
            <Typography variant="h2">Heading 2: ligula ullamcorper</Typography>
          </Box>
          <Box sx={{ textTransform: "capitalize", textAlign: "center" }}>
            <Typography variant="h3">Heading 3: amet consectetur</Typography>
          </Box>
          <Box sx={{ textTransform: "capitalize", textAlign: "center" }}>
            <Typography variant="h4">Heading 4: vulputate sapien</Typography>
          </Box>
          <Box sx={{ textTransform: "capitalize", textAlign: "center" }}>
            <Typography variant="h5">
              Heading 5: massa eget egestas purus viverra accumsan in nisl
            </Typography>
          </Box>
          <Box sx={{ textTransform: "capitalize", textAlign: "center" }}>
            <Typography variant="body1">
              Body 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Id interdum velit laoreet id donec ultrices.
            </Typography>
          </Box>
          <Box sx={{ textTransform: "capitalize", textAlign: "center" }}>
            <Typography variant="body2">
              Body 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Id interdum velit laoreet id donec ultrices.
            </Typography>
          </Box>
          <Box sx={{ textTransform: "capitalize", textAlign: "center" }}>
            <Typography variant="subtitle1">
              Subtitle 1: non nisi est sit amet facilisis magna etiam
            </Typography>
          </Box>
          <Box sx={{ textTransform: "capitalize", textAlign: "center" }}>
            <Typography variant="subtitle2">
              Subtitle 2: non nisi est sit amet facilisis magna etiam
            </Typography>
          </Box>
          <Box sx={{ textTransform: "capitalize", textAlign: "center" }}>
            <Typography variant="caption">
              Caption: Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </Box>
          <Box sx={{ textTransform: "capitalize", textAlign: "center" }}>
            <Typography variant="overline">
              Overline: Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </Box>
        </Container>
        <Typography variant="h5" sx={{ textAlign: "center", margin: 2 }}>
          Buttons
        </Typography>
        <Container
          sx={{
            width: "70%",
            padding: 3,
            border: `1px dashed ${crAppTheme.palette.primary.light}`,
          }}
        >
          <Typography sx={{ textAlign: "center", margin: 1 }}>
            Large Button
          </Typography>
          <Container
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <PrimaryButton>
              <Typography variant="h4" sx={{ textTranform: "capitolize" }}>
                Primary
              </Typography>
            </PrimaryButton>
            <SecondaryButton>
              <Typography variant="h4" sx={{ textTranform: "capitolize" }}>
                Secondary
              </Typography>
            </SecondaryButton>
            <TertiaryButton>
              <Typography variant="h4" sx={{ textTranform: "capitolize" }}>
                Tertiary
              </Typography>
            </TertiaryButton>
          </Container>

          <Typography sx={{ textAlign: "center", margin: 1 }}>
            Medium Button
          </Typography>
          <Container
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <PrimaryButton>
              <Typography variant="body1" sx={{ textTranform: "capitolize" }}>
                Primary
              </Typography>
            </PrimaryButton>
            <SecondaryButton>
              <Typography variant="body1" sx={{ textTranform: "capitolize" }}>
                Secondary
              </Typography>
            </SecondaryButton>
            <TertiaryButton>
              <Typography variant="body1" sx={{ textTranform: "capitolize" }}>
                Tertiary
              </Typography>
            </TertiaryButton>
          </Container>

          <Typography sx={{ textAlign: "center", margin: 1 }}>
            Small Button
          </Typography>
          <Container
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <PrimaryButton>
              <Typography
                variant="subtitle1"
                sx={{ textTranform: "capitolize" }}
              >
                Primary
              </Typography>
            </PrimaryButton>
            <SecondaryButton>
              <Typography
                variant="subtitle1"
                sx={{ textTranform: "capitolize" }}
              >
                Secondary
              </Typography>
            </SecondaryButton>
            <TertiaryButton>
              <Typography
                variant="subtitle1"
                sx={{ textTranform: "capitolize" }}
              >
                Tertiary
              </Typography>
            </TertiaryButton>
          </Container>
        </Container>
        <Typography variant="h5" sx={{ textAlign: "center", margin: 2 }}>
          Forms
        </Typography>
        <Container
          sx={{
            width: "70%",
            padding: 3,
            border: `1px dashed ${crAppTheme.palette.primary.light}`,
          }}
        >
          <Typography sx={{ textAlign: "center", margin: 1 }}>
            Search Bar
          </Typography>
          <Container>
            <CustomizedInputBase component="form">
              <CustomizedIconButton aria-label="my-location">
                <MyLocationIcon />
              </CustomizedIconButton>
              <CustomizedInput
                placeholder="Search Google Maps"
                inputProps={{ "aria-label": "search google maps" }}
              />
              <CustomizedIconButton type="button" aria-label="search">
                <SearchIcon />
              </CustomizedIconButton>
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <CustomizedIconButton color="primary" aria-label="directions">
                <DirectionsIcon />
              </CustomizedIconButton>
            </CustomizedInputBase>
          </Container>
          <Typography sx={{ textAlign: "center", margin: 1 }}>
            Standard Form Types
          </Typography>
          <Container>
            <CustomizedTextField
              required
              id="outlined-required"
              label="Required"
              defaultValue="Hello World"
            />
            <CustomizedTextField
              disabled
              id="outlined-disabled"
              label="Disabled"
              defaultValue="Hello World"
            />
            <CustomizedTextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
            <CustomizedTextField
              id="outlined-read-only-input"
              label="Read Only"
              defaultValue="Hello World"
              InputProps={{
                readOnly: true,
              }}
            />
            <CustomizedTextField
              id="outlined-number"
              label="Number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <CustomizedTextField
              id="outlined-search"
              label="Search field"
              type="search"
            />
            <CustomizedTextField
              id="outlined-helperText"
              label="Helper text"
              defaultValue="Default Value"
              helperText="Some important text"
            />
            <CustomizedTextField
              id="outlined-select-currency"
              select
              label="Select"
              defaultValue="EUR"
              helperText="Please select your currency"
            >
              <MenuItem>Options</MenuItem>
              <MenuItem>Options</MenuItem>
              <MenuItem>Options</MenuItem>
            </CustomizedTextField>
            <FormControl variant="standard">
              <InputLabel htmlFor="input-with-icon-adornment">
                With a start adornment
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
              />
            </FormControl>
            <CustomizedTextField
              id="outlined-helperText"
              label="Helper text"
              defaultValue="Default Value"
              helperText="Some important text"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
          </Container>
        </Container>

        <Typography variant="h5" sx={{ textAlign: "center", margin: 2 }}>
          Ratings
        </Typography>
        <Container
          sx={{
            width: "70%",
            padding: 3,
            border: `1px dashed ${crAppTheme.palette.primary.light}`,
          }}
        >
          <Typography sx={{ margin: 1 }}>Half Ratings</Typography>
          <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
          <Typography sx={{ margin: 1 }}>Read Only</Typography>
          <Rating name="read-only" readOnly />
          <Typography sx={{ margin: 1 }}>Disabled</Typography>
          <Rating name="disabled" disabled />
          <Typography sx={{ margin: 1 }}>No Ratings Given</Typography>
          <Rating name="no-value" value={null} />
          <Typography sx={{ margin: 1 }}>Custom Rating</Typography>
          <StyledRating
            name="customized-icons"
            defaultValue={3}
            getLabelText={(value) => customIcons[value].label}
            IconContainerComponent={IconContainer}
          />
        </Container>
        <Typography variant="h5" sx={{ textAlign: "center", margin: 2 }}>
          Pop Up
        </Typography>
        <Container
          sx={{
            width: "70%",
            padding: 3,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            border: `1px dashed ${crAppTheme.palette.primary.light}`,
          }}
        >
          <PrimaryButton onClick={handleDrawerOpen}>Open Drawer</PrimaryButton>
          <Drawer variant="persistent" anchor="left" open={open}>
            <div>
              <List>
                {["Inbox", "Starred", "Send email", "Drafts"].map(
                  (text, index) => (
                    <ListItem key={text} disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </ListItem>
                  )
                )}
              </List>
              <Divider />
              <List>
                {["All mail", "Trash", "Spam"].map((text, index) => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <SecondaryButton onClick={handleDrawerClose}>
                Close Drawer
              </SecondaryButton>
            </div>
          </Drawer>
          <PrimaryButton onClick={handleDialogOpen}>Open Dialog</PrimaryButton>
          <Dialog open={openDialog} onClose={handleDialogClose}>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogContent>
              <DialogContentText>
                This is the content of the dialog.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Cancel</Button>
              <Button onClick={handleDialogClose} autoFocus>
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Container>
    </ThemeProvider>
  );
};

export default StyleGuide;

export {
  PrimaryButton,
  SecondaryButton,
  TertiaryButton,
  CustomizedInputBase,
  CustomizedInput,
  CustomizedIconButton,
  CustomizedTextField,
  StyledRating,
  customIcons,
};
