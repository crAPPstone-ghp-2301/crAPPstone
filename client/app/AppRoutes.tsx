import React from "react";
import { Route, Routes } from "react-router-dom";
import StyleGuide from "../features/styles/StyleGuide";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/styleguide" element={<StyleGuide />} />
    </Routes>
  );
};

export default AppRoutes;
