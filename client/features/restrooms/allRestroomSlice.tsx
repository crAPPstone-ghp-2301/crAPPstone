import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllRestrooms = createAsyncThunk(
  "restrooms/getAll",
  async () => {
    try {
      console.log("ALL restrooms AXIOS WORKING");
      const { data } = await axios.get(`/api/restrooms`);
      return data;
    } catch (error) {
      return error.message;
    }
  }
);

export const allRestroomsSlice = createSlice({
  name: "restrooms",
  initialState: {
    allRestrooms: [],
    error: null,
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllRestrooms.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(getAllRestrooms.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectRestroom = (state) => {
  return state.restrooms;
};

export default allRestroomsSlice.reducer;
