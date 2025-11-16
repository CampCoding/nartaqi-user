import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
console.log(baseUrl);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${baseUrl}/authentication/login`, data);

      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${baseUrl}/authentication/signup`, data);

      console.log("signupUser");

      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    error: null,
    loading: false,
    userSignUpdata: null,
    resetPassword: null,
  },
  reducers: {
    logoutUser: (state, action) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    userSignUpdata: (state, action) => {
      state.userSignUpdata = action.payload;
    },
    resetPasswordData: (state, action) => {
      state.resetPassword = {
        ...state.resetPassword,
        ...action.payload,
      };
    },
    clearResetPasswordData: (state) => {
      state.resetPassword = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(state, action);

        state.loading = false;
        state.user = action.payload.message;
        state.token = action.payload.message.token;
        localStorage.setItem("token", action.payload.message.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log(state, action);
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signupUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  logoutUser,
  userSignUpdata,
  resetPasswordData,
  clearResetPasswordData,
} = authSlice.actions;
export default authSlice;
