import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const TOKEN = "token";

export const me = createAsyncThunk("auth/me", async () => {
  const token = window.localStorage.getItem(TOKEN);
  try {
    if (token) {
      const res = await axios.get("/auth/me", {
        headers: {
          authorization: token,
        },
      });
      return res.data;
    } else {
      return {};
    }
  } catch (err) {
    if (err.response.data) {
      throw new Error(`Failed to fetch user data: ${err.response.data}`);
    } else {
      throw new Error("Failed to fetch user data. Please try again later.");
    }
  }
});

export const authenticate = createAsyncThunk(
  "auth/authenticate",
  async ({ username, password, name, email, isAdmin, method }, thunkAPI) => {
    try {
      const res = await axios.post(`/auth/${method}`, {
        username,
        password,
        name,
        email,
        isAdmin,
      });
      window.localStorage.setItem(TOKEN, res.data.token);
      thunkAPI.dispatch(me());
    } catch (err) {
      if (err.response.data) {
        throw new Error(`Failed to authenticate: ${err.response.data}`);
      } else {
        throw new Error("Failed to authenticate. Please try again later.");
      }
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/update",
  async ({ id, username, password, name, email }) => {
    try {
      const { data } = await axios.put(`/api/users/${id}`, {
        username,
        password,
        name,
        email,
      });
      return data;
    } catch (err) {
      if (err.response.data) {
        throw new Error(`Failed to update user: ${err.response.data}`);
      } else {
        throw new Error("Failed to update user. Please try again later.");
      }
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    me: {},
    error: null,
  },
  reducers: {
    logout(state, action) {
      window.localStorage.removeItem(TOKEN);
      state.me = {};
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(me.fulfilled, (state, action) => {
      state.me = action.payload;
      state.error = null;
    });
    builder.addCase(me.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(authenticate.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
