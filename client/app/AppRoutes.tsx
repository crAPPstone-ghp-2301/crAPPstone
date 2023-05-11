import React from "react";
import { useSelector } from "react-redux";
import crAppTheme from "./theme";
import { ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import StyleGuide from "../features/styles/StyleGuide";
import AllRestrooms from "../features/restrooms/Restrooms";
import SingleRestroom from "../features/restrooms/SingleRestroom";
import AllReviews from "../features/review/AllReview";
import SingleReview from "../features/review/SingleReview";
import AllComments from "../features/Comments/AllComments";
import SignIn from "../features/navigation/SignIn";
import Home from "../features/home/Home";
import AuthForm from "../features/auth/AuthForm";

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <ThemeProvider theme={crAppTheme}>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <AuthForm
                  name="login"
                  displayName="Log In"
                  oppositeName="Create Account"
                />
              }
            />
            <Route
              path="/signup"
              element={
                <AuthForm
                  name="signup"
                  displayName="Create Account"
                  oppositeName="Log In"
                />
              }
            />
            <Route path="/restrooms" element={<AllRestrooms />} />
            <Route path="/restrooms/:id" element={<SingleRestroom />} />
            <Route
              path="/restrooms/:restroomId/reviews"
              element={<AllReviews />}
            />
            <Route path="/reviews/:reviewId" element={<SingleReview />} />
            <Route
              path="/reviews/:reviewId/comments"
              element={<AllComments />}
            />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/styleguide" element={<StyleGuide />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/restrooms" element={<AllRestrooms />} />
            <Route path="/restrooms/:id" element={<SingleRestroom />} />
            <Route
              path="/restrooms/:restroomId/reviews"
              element={<AllReviews />}
            />
            <Route path="/reviews/:reviewId" element={<SingleReview />} />
            <Route
              path="/reviews/:reviewId/comments"
              element={<AllComments />}
            />
          </>
        )}
      </Routes>
    </ThemeProvider>
  );
};

export default AppRoutes;