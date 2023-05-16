import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//fetch all reviews
export const fetchAllReviews = createAsyncThunk(
  "reviews/fetchAll",
  async () => {
    try {
      const { data } = await axios.get(`/api/reviews`);
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

//fetch all reviews of a restroomId
export const fetchAllReviewsOfRestroomId = createAsyncThunk(
  "reviews/fetchReviewsOfRestroomId",
  async (restroomId) => {
    const response = await axios.get(`/api/restrooms/${restroomId}/reviews`);
    return response.data;
  }
);

//fetch single review
export const fetchSingleReview = createAsyncThunk(
  "reviews/fetchSingle",
  async (reviewId) => {
    try {
      const { data } = await axios.get(`/api/reviews/${reviewId}`);
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

//delete single review
export const deleteReview = createAsyncThunk(
  "reviews/delete",
  async (reviewId) => {
    try {
      const { data } = await axios.delete(`/api/reviews/${reviewId}`);
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

//create or update a review
export const createOrUpdateReview = createAsyncThunk(
  "reviews/createOrUpdateReview",
  async ({ reviewId, imageURL, reviewText, reportStatus }) => {
    const { data } = await axios.patch(`/api/reviews/${reviewId}`, {
      imageURL,
      reviewText,
      reportStatus,
    });
    return data;
  }
);

//create review
// export const createReview = createAsyncThunk(
//   'reviews/createReview',
//   async ({ restroomId, imageURL, reviewText, reportStatus, userId }) => {
//     const token = localStorage.getItem("token");
//     try {
//       if (token) {
//         const { data } = await axios.post(`/api/restrooms/${restroomId}/reviews`, {
//           imageURL,
//           reviewText,
//           reportStatus,
//           userId
//         },
//           {
//             headers: {
//               authorization: token,
//             },
//           }
//         );
//         return data;
//       } else {
//         const { data } = await axios.post(`/api/restrooms/${restroomId}/reviews`,
//           {
//           imageURL,
//           reviewText,
//           reportStatus,
//           userId: null,
//           },
//         )
//         return data;
//       }
//     } catch (err) {
//       return err.message;
//     }
//   }
// );
export const createReview = createAsyncThunk(
  'reviews/createReview',
  async ({ restroomId, reviewText, reportStatus, imageURL }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `/api/restrooms/${restroomId}/reviews`,
        { reviewText, reportStatus, imageURL },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);


const initialState = {
  allReviews: [],
  singleReview: {},
};

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllReviews.fulfilled, (state, action) => {
      state.allReviews = action.payload;
    });
    builder.addCase(fetchAllReviewsOfRestroomId.fulfilled, (state, action) => {
      state.allReviews = action.payload;
    });
    builder.addCase(fetchSingleReview.fulfilled, (state, action) => {
      state.singleReview = action.payload;
    });
    builder.addCase(deleteReview.fulfilled, (state, action) => {
      state.allReviews = state.allReviews.filter(
        (review) => review.id !== action.payload
      );
    });
    builder.addCase(createOrUpdateReview.fulfilled, (state, action) => {
      const reviewIndex = state.allReviews.findIndex(
        (review) => review.id === action.payload.id
      );
      if (reviewIndex !== -1) {
        state.allReviews[reviewIndex] = action.payload;
      } else {
        state.allReviews.push(action.payload);
      }
    });
    builder.addCase(createReview.fulfilled, (state, action) => {
      state.allReviews.push(action.payload);
     })
  },
});

export default reviewSlice.reducer;
