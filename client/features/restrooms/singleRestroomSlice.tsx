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


export const deleteRestroom = createAsyncThunk(
  "restrooms/delete",
  async (id) => {
    try {
      const { data } = await axios.delete(`/api/restrooms/${id}`);
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

//create or update a restroom
export const createOrUpdateRestroom = createAsyncThunk(
  "restrooms/createOrUpdateRestroom",
  async ({ name, imageURL, description, openingHours }) => {
    const { data } = await axios.patch(`/api/restrooms/${id}`, {
      name,
      imageURL,
      description,
      openingHours,
    });
    return data;
  }
);



const initialState = {
  allRestrooms: [],
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
    builder.addCase(deleteRestroom.fulfilled, (state, action) => {
      state.allRestrooms = state.allRestrooms.filter(
        (restroom) => restroom.id !== action.payload
      );
    });
    builder.addCase(createOrUpdateRestroom.fulfilled, (state, action) => {
      const restroomIndex = state.allRestrooms.findIndex(
        (restroom) => restroom.id === action.payload.id
      );
      if (restroomIndex !== -1) {
        state.allRestrooms[restroomIndex] = action.payload;
      } else {
        state.allRestrooms.push(action.payload);
      }
    });
  },
});

export const selectSingleRestroom = (state) => {
  return state.singleRestroom;
};

export default restroomSlice.reducer;
