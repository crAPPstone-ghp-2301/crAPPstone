import React from "react";
import crAppTheme from "./theme";
import { ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import StyleGuide from "../features/styles/StyleGuide";
import SignIn from "../features/navigation/SignIn";

/**
 * COMPONENT
 */

const AppRoutes = () => {
  return (
    <ThemeProvider theme={crAppTheme}>
      <Routes>
        {/* <Route path="/*" element={<Home />} />
        <Route to="/home" element={<Home />} /> */}
        <Route path="/styleguide" element={<StyleGuide />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </ThemeProvider>
  );
};

export default AppRoutes;
