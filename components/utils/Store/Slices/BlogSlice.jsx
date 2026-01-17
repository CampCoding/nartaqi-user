import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getBlogComments = createAsyncThunk(
  "blog/getBlogComments",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${baseUrl}/user/blogs/comments`, data, {
        headers: {
          Accept: "application/json",
        },
      });


      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data?.message || "حدث خطأ ما");
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: {},
    blog: {},
    comments: {},
    link: {},
    commentContent: {},
    loading: false,
    error: null,
  },
  reducers: {
    saveComment: (state, action) => {
      state.commentContent = action.payload.commentContent;
      state.link = action.payload.link;
    },
    clearComment: (state) => {
      state.commentContent = null;
      state.link = null;
    },
  },
});

// مهم في الستورتستخدم blogSlice.reducer
export default blogSlice;
export const { saveComment, clearComment } = blogSlice.actions;
