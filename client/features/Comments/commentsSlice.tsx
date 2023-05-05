import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllComments = createAsyncThunk(
  "comments/fetchAll",
  async () => {
    try {
      const { data } = await axios.get("/api/comments");
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

export const fetchSingleComment = createAsyncThunk(
  "comments/fetchSingle",
  async (id) => {
    try {
      const { data } = await axios.get(`/api/comments/${id}`);
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

export const createComment = createAsyncThunk(
  "comments/create",
  async (comment) => {
    try {
      const { data } = await axios.post("/api/comments", comment);
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

export const updateComment = createAsyncThunk(
  "comments/update",
  async ({ id, content, likes }) => {
    try {
      const { data } = await axios.put(`/api/comments/${id}`, {
        content,
        likes,
      });
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

export const deleteComment = createAsyncThunk("comments/delete", async (id) => {
  try {
    const { data } = await axios.delete(`/api/comments/${id}`);
    return data;
  } catch (err) {
    return err.message;
  }
});

const initialState = {
  allComments: [],
  singleComment: {},
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllComments.fulfilled, (state, action) => {
      state.allComments = action.payload;
    });
    builder.addCase(fetchSingleComment.fulfilled, (state, action) => {
      state.singleComment = action.payload;
    });
    builder.addCase(createComment.fulfilled, (state, action) => {
      state.allComments.push(action.payload);
    });
    builder.addCase(updateComment.fulfilled, (state, action) => {
      state.singleComment = action.payload;
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.allComments = state.allComments.filter(
        (comment) => comment.id !== action.payload
      );
    });
  },
});

export const selectAllComments = (state) => {
  return state.comments.allComments;
};
export const selectSingleComment = (state) => {
  return state.comments.singleComment;
};

export const selectCommentsByReviewId = (reviewId) => (state) =>
  state.comments.allComments.filter((comment) => comment.reviewId === reviewId);


export default commentsSlice.reducer;
