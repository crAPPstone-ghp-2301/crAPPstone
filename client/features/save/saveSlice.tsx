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
  async (restroomId) => {
    try {
      // console.log("saved slice addsavedrestroom")
      console.log('saved slice, restroom id', restroomId)
      const { data } = await axios.post('/api/saved', {restroomId})
      return data
    } catch (error) {
      throw error
    }
})

export const deleteSavedRestroom = createAsyncThunk('saved/deleteSaveRestroom', async (restroomId) => {
  try {
    await axios.delete(`/api/saved/${restroomId}`)
    return restroomId
  } catch (error) {
    throw error
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
      .addCase(deleteSavedRestroom.fulfilled, (state, action) => {
        return action.payload
      })
  },
});

export const selectSaved = (state) => {
  return state.savedRestrooms
};

export default savedSlice.reducer
