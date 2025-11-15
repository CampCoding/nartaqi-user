import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getBlogs = createAsyncThunk(
  "blog/getBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${baseUrl}/user/blogs`, {
        headers: {
          Accept: "application/json",
        },
      });

      console.log("blogs fetched");

      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data?.message || "حدث خطأ ما");
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState: { blogs: {}, blog: {}, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// مهم في الستورتستخدم blogSlice.reducer
export default blogSlice;
