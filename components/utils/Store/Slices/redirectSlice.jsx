import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const redirectSlice = createSlice({
  name: "redirect",
  initialState: {
    link: null,
    content: null,
  },
  reducers: {
    saveContent: (state, action) => {
      console.log(action);

      state.content = action.payload.content;
      state.link = action.payload.link;
    },
    clearContent: (state) => {
      state.content = null;
      state.link = null;
    },
  },
});

// مهم في الستورتستخدم blogSlice.reducer
export default redirectSlice;
export const { saveContent, clearContent } = redirectSlice.actions;
