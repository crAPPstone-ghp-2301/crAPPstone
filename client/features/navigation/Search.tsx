import * as React from "react";
import crAppTheme from "../../app/theme";
import {
  useMediaQuery,
  ThemeProvider,
  Paper,
  InputBase,
  IconButton,
  CssBaseline,
  Divider,
  Container,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";

const Search = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

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
          <Container sx={{ position: "absolute", top: 5, left: 50 }}>
            <CustomizedInputBase sx={{ width: 250, height: 40 }}>
              <CustomizedInput
                placeholder="Search crApp the Maps"
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
        ) : (
          <Container sx={{ position: "absolute", top: 0, left: 100 }}>
            <CustomizedInputBase>
              <CustomizedInput
                placeholder="Search crApp the Maps"
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
        )}
      </Container>
    </ThemeProvider>
  );
};
export default Search;
