import React from "react";
import crAppTheme from "../../app/theme";
import {
  ThemeProvider,
  Paper,
  InputBase,
  IconButton,
  CssBaseline,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";

const Search = () => {
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
      <CustomizedInputBase component="form">
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
    </ThemeProvider>
  );
};
export default Search;
