import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const RoundsSlice = createAsyncThunk(
  "rounds/getRounds",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${baseUrl}/user/rounds/getRounds?per_page=2&page=1`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      console.log("blogs fetched");

      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data?.message || "حدث خطأ ما");
    }
  }
);

const RoundsSlice = createSlice({
  name: "rounds",
  initialState: { rounds: {}, round: {}, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRounds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRounds.fulfilled, (state, action) => {
        state.blogs = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getRounds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// مهم في الستورتستخدم blogSlice.reducer
export default RoundsSlice;
