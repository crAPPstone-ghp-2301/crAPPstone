import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const SearchByName = createAsyncThunk(
    "restrooms/getByName",
    async ({name}) => {
      try {
        const { data } = await axios.get(`/api/search?name=${name}`);
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  );

  const initialState = {
    output: {},
  };
  export const searchSlice = createSlice({
    name: 'searchoutput',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SearchByName.fulfilled,(state, action)=>{
              state.output = action.payload
            })
           
            
    },
});

export default searchSlice.reducer;