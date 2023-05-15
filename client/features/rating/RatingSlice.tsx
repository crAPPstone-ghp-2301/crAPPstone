import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import axios from "axios";

export const createRating = createAsyncThunk(
    'ratings/createRating',
    async ({ userId, restroomId, userRating, isClean }) => {
        const {data} = await axios.post(`/api/ratings`, {
          userId,
          restroomId,
          userRating,
          isClean,
        });
        return data;
    }
  );

  export const fetchRatings = createAsyncThunk(
    'ratings/fetchRatings',
    async (restroomId) => {
      try {
        const { data } = await axios.get(`/api/ratings/${restroomId}`);
        return data;
      } catch (error) {
        throw new Error('Failed to fetch ratings');
      }
    }
  );

  const initialState = {
    newRating: {},
    pastRating:[],
  };

  export const RatingSlice = createSlice({
    name: "rating",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(createRating.fulfilled, (state, action) => {
          state.newRating = action.payload;
        })
        .addCase(fetchRatings.fulfilled, (state, action) => {
          state.pastRating = action.payload;
        });
    },
  });

  export default RatingSlice.reducer;