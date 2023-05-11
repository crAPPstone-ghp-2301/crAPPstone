import React, { useEffect } from "react";
import crAppTheme from "./theme";
import { ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { me } from "./store";
import { useSelector, useDispatch } from "react-redux";
import StyleGuide from "../features/styles/StyleGuide";
import AllRestrooms from "../features/restrooms/Restrooms";
import SingleRestroom from "../features/restrooms/SingleRestroom";
import AllReviews from "../features/review/AllReview";
import SingleReview from "../features/review/SingleReview";
import AllComments from "../features/Comments/AllComments";
import Home from "../features/home/Home";
import EditProfile from "../features/settings/EditProfile";
import AuthForm from "../features/auth/AuthForm";

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

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
            <Route path="/editprofile" element={<EditProfile />} />
          </>
        ) : (
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
        )}
        <Route path="/styleguide" element={<StyleGuide />} />
      </Routes>
    </ThemeProvider>
  );
};

export default AppRoutes;
