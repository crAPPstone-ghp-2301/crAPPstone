import React, { useEffect } from "react";
import crAppTheme from "./theme";
import { ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { me } from "./store";
import { useSelector, useDispatch } from "react-redux";
import StyleGuide from "../features/styles/StyleGuide";
import AuthForm from "../features/auth/AuthForm";
import AllRestrooms from "../features/restrooms/Restrooms";
import SingleRestroom from "../features/restrooms/SingleRestroom";
import AllReviews from "../features/review/AllReview";
import SingleReview from "../features/review/SingleReview";
import AllComments from "../features/Comments/AllComments";
import Home from "../features/home/Home";
import Profile from "../features/users/Profile";
import EditProfile from "../features/users/EditProfile";
import Saved from "../features/save/Saved";
import Help from "../features/settings/Help";
import Share from "../features/settings/Share";
import AddReview from "../features/review/AddReview";
import NotFound from "../features/notFound/NotFound";
import History from "../features/history/History";
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
            <Route path="/profile" element={<Profile />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="saved" element={<Saved />} />
            <Route path="history" element={<History />} />
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
            <Route path="saved" element={<Saved />} />
          </>
        )}
        <Route path="/styleguide" element={<StyleGuide />} />
        <Route path="/share" element={<Share />} />
        <Route path="/help" element={<Help />} />
        <Route path="/restrooms" element={<AllRestrooms />} />
        <Route path="/restrooms/:id" element={<SingleRestroom />} />
        <Route path="/restrooms/:restroomId/reviews" element={<AllReviews />} />
        <Route path="/restrooms/:restroomId/reviews/:reviewId" element={<SingleReview />} />
        <Route path="/reviews/:reviewId/comments" element={<AllComments />} />
        <Route path="/restrooms/:restroomId/reviews/add" element={<AddReview />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/NotFound" element={<NotFound />} />
        <Route path="history" element={<History />} />

      </Routes>
    </ThemeProvider>
  );
};

export default AppRoutes;
