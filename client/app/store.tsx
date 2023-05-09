import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../features/auth/authSlice";
import commentsSlice from "../features/Comments/commentsSlice";
import reviewSlice from "../features/review/reviewSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    comments: commentsSlice,
    review: reviewSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";
