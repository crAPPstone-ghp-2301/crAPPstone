import React from "react";
import crAppTheme from "./theme";
import { ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import StyleGuide from "../features/styles/StyleGuide";

/**
 * COMPONENT
 */

const AppRoutes = () => {
  return (
    <ThemeProvider theme={crAppTheme}>
      <Routes>
        <Route path="/styleguide" element={<StyleGuide />} />
      </Routes>
    </ThemeProvider>
  );
};

export default AppRoutes;
