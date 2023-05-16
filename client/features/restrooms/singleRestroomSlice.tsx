import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const getSingleRestroom = createAsyncThunk(
  "restrooms/getSingle",
  async (id) => {
    try {
      const { data } = await axios.get(`/api/restrooms/${id}`);
      return data;
    } catch (err) {
      return err.message;
    }
  }
);





const initialState = {
  singleRestroom: {},
};

export const restroomSlice = createSlice({
  name: "restroom",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSingleRestroom.fulfilled, (state, action) => {
      state.singleRestroom = action.payload;
    });
  },
});

export const selectSingleRestroom = (state) => {
  return state.singleRestroom.singleRestroom;
};

export default restroomSlice.reducer;
