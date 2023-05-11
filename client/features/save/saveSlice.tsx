//slice for save component
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSavedRestrooms = createAsyncThunk(
  "saved/getAllSavedRestrooms",
  async () => {
    try {
      console.log("saved slice getSaved hit");
      const { data } = await axios.get(`/api/saved`);
      return data;
    } catch (error) {
      return error.message;
    }
  }
);

export const addSavedRestroom = createAsyncThunk(
  'saved/addSavedRestroom',
  async () => {
    try {
      console.log("saved slice addsavedrestroom")
      const { data } = await axios.post('/api/saved')
      return data
    } catch (error) {
      return error.message
    }
})

export const savedSlice = createSlice({
  name: "saved",
  initialState: {
    savedRestrooms: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSavedRestrooms.fulfilled, (state, action) => {
        state.savedRestrooms = action.payload
      })
      .addCase(addSavedRestroom.fulfilled, (state, action) => {
        state.savedRestrooms.push(action.payload)
      })
  },
});

export const selectSaved = (state) => {
  return state.savedRestrooms;
};

export default savedSlice.reducer
