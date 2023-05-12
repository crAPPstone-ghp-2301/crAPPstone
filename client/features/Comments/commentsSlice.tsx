import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//fetch all comments of review
export const fetchAllComments = createAsyncThunk(
  "comments/fetchAll",
  async (reviewId) => {
    try {
      const { data } = await axios.get(`/api/reviews/${reviewId}/comments`);
      console.log(reviewId, data);
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

//fetch a single comment of a reviewId and its replies
export const fetchSingleComment = createAsyncThunk(
  "comments/fetchSingleComment",
  async ({reviewId, commentId}) => {
    try {
      const { data } = await axios.get(
        `/api/reviews/${reviewId}/comments/${commentId}`
      );
      return data;
    } catch (err) {
      return err.message;
    }
  }
);

//create new comment of review
export const createComment = createAsyncThunk(
  'comments/createComment',
  async ({ reviewId, content, userId }) => {
    const token = window.localStorage.getItem('token');
    try {
      if (token) {
        const { data } = await axios.post(
          `/api/reviews/${reviewId}/comments`,
          {
            content,
            userId,
          },
          {
            headers: {
              authorization: token,
            },
          }
        );
        return data;
      } else {
        const { data } = await axios.post(
          `/api/reviews/${reviewId}/comments`,
          {
            content,
            userId: null,
          },
        )
        return data;

      }
    } catch (error) {
      console.log(error);
    }
  }
);

//update a comment of review
export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async ({ reviewId, commentId, content, likes }) => {
    const { data } = await axios.put(
      `/api/reviews/${reviewId}/comments/${commentId}`,
      {
        content,
        likes,
      }
    );
    return data;
  }
);

//delete a comment of review
export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async ({ reviewId, commentId }) => {
    const { data } = await axios.delete(
      `/api/reviews/${reviewId}/comments/${commentId}`
    );
    return data;
  }
);

//thunks pertaining to replies of parentCommentId
//create a new reply of parentCommentId
export const createReply = createAsyncThunk(
  "comments/createReply",
  async ({ reviewId, commentId, content }) => {
    const { data } = await axios.post(
      `/api/reviews/${reviewId}/comments/${commentId}/replies`,
      {
        content,
      }
    );
    return data;
  }
);

//update a reply of parentCommentId
export const updateReply = createAsyncThunk(
  "comments/updateReply",
  async ({ reviewId, parentCommentId, commentId, content, likes }) => {
    const { data } = await axios.put(
      `/api/reviews/${reviewId}/comments/${parentCommentId}/replies/${commentId}`,
      {
        content,
        likes,
      }
    );
    return data;
  }
);

//delete a reply of parentCommentId
export const deleteReply = createAsyncThunk(
  "comments/deleteReply",
  async ({ reviewId, parentCommentId, commentId }) => {
    const { data } = await axios.delete(
      `/api/reviews/${reviewId}/comments/${parentCommentId}/replies/${commentId}`
    );
    return data;
  }
);

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
    builder.addCase(createReply.fulfilled, (state, action) => {
      state.allComments.push(action.payload);
    });
    builder.addCase(updateReply.fulfilled, (state, action) => {
      state.singleComment = action.payload;
    });
    builder.addCase(deleteReply.fulfilled, (state, action) => {
      state.allComments = state.allComments.filter(
        (comment) => comment.id !== action.payload
      );
    });
  },
});

export default commentsSlice.reducer;
