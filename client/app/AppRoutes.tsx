import React from "react";
import crAppTheme from "./theme";
import { ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import StyleGuide from "../features/styles/StyleGuide";
import Profile from "../features/navigation/SignIn";
import AllRestrooms from "../features/restrooms/Restrooms";
import SingleRestroom from "../features/restrooms/SingleRestroom";
import SingleReview from "../features/review/SingleReview";
import AllComments from "../features/Comments/AllComments";
import SingleComment from "../features/Comments/SingleComment"
import SignIn from "../features/navigation/SignIn";
import AddComment from "../features/comments/AddComment";
import AddReply from "../features/comments/AddReply";
import Comments from "../features/comments/Comments";
import SingleComment from "../features/comments/SingleComment";
import Home from "../features/home/Home"
import AddComment from "../features/Comments/AddComment";
import AddReply from "../features/Comments/AddReply";


const AppRoutes = () => {
  return (
    <ThemeProvider theme={crAppTheme}>
      <Routes>
        <Route path="/styleguide" element={<StyleGuide />} />
        <Route path="/profile" element={<SignIn />} />
        <Route path="/" element ={<Home/>} />
        <Route path="/restrooms" element={<AllRestrooms />} />
        <Route path="/restrooms/:id" element={<SingleRestroom />} />
        <Route path="/reviews/:reviewId" element={<SingleReview />} />
        <Route path="/reviews/:reviewId/comments" element={<AllComments />} />
        <Route path="/reviews/:reviewId/comments/:commentId" element={<SingleComment />} />
        <Route path="/reviews/:reviewId/comments/:commentId/addreply" element={<AddReply />} />
      </Routes>
    </ThemeProvider>
  );
};

export default AppRoutes;
