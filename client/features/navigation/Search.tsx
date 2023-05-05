import React from "react";
import crAppTheme from "../../app/theme";
import { ThemeProvider, Container, CssBaseline } from "@mui/material";

const Search = () => {
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
