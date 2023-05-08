import React from "react";
import crAppTheme from "./theme";
import { ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import StyleGuide from "../features/styles/StyleGuide";
import Profile from "../features/navigation/SignIn";
import AddComment from "../features/comments/AddComment";
import AddReply from "../features/comments/AddReply";
import Comments from "../features/comments/Comments";
import SingleComment from "../features/comments/SingleComment";


/**
 * COMPONENT
 */

const AppRoutes = () => {
  return (
    <ThemeProvider theme={crAppTheme}>
      <Routes>
        <Route path="/styleguide" element={<StyleGuide />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/addcomment" element={<AddComment />} />
        <Route path="/addreply" element={<AddReply />} />
        <Route path="/comments" element={<Comments />} />
        <Route path="/comments/:id" element={<SingleComment />} />
      </Routes>
    </ThemeProvider>
  );
};

export default AppRoutes;
