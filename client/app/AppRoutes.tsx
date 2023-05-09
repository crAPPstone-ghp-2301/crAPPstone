import React from "react";
import crAppTheme from "./theme";
import { ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import StyleGuide from "../features/styles/StyleGuide";
import Profile from "../features/navigation/SignIn";
import SingleReview from "../features/review/SingleReview";
import AllComments from "../features/Comments/AllComments";
import SingleComment from "../features/comments/SingleComment"
import AddReply from "../features/comments/AddReply";



const AppRoutes = () => {
  return (
    <ThemeProvider theme={crAppTheme}>
      <Routes>
        <Route path="/styleguide" element={<StyleGuide />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/reviews/:reviewId" element={<SingleReview />} />
        <Route path="/reviews/:reviewId/comments" element={<AllComments />} />
        <Route path="/reviews/:reviewId/comments/:commentId" element={<SingleComment />} />
        <Route path="/reviews/:reviewId/comments/:commentId/addreply" element={<AddReply />} />
      </Routes>
    </ThemeProvider>
  );
};

export default AppRoutes;
