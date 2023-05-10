import React from "react";
import crAppTheme from "./theme";
import { ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import StyleGuide from "../features/styles/StyleGuide";
import Profile from "../features/navigation/SignIn";
import AllRestrooms from "../features/restrooms/Restrooms";
import SingleRestroom from "../features/restrooms/SingleRestroom";
import AllReviews from "../features/review/AllReview";
import SingleReview from "../features/review/SingleReview";
import AllComments from "../features/Comments/AllComments";
import SignIn from "../features/navigation/SignIn";
import Home from "../features/home/Home"


const AppRoutes = () => {
  return (
    <ThemeProvider theme={crAppTheme}>
      <Routes>
        <Route path="/styleguide" element={<StyleGuide />} />
        <Route path="/profile" element={<SignIn />} />
        <Route path="/" element ={<Home/>} />
        <Route path="/restrooms" element={<AllRestrooms />} />
        <Route path="/restrooms/:id" element={<SingleRestroom />} />
        <Route path="/restrooms/:restroomId/reviews" element={<AllReviews />} />
        <Route path="/reviews/:reviewId" element={<SingleReview />} />
        <Route path="/reviews/:reviewId/comments" element={<AllComments />} />
      </Routes>
    </ThemeProvider>
  );
};

export default AppRoutes;
