import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getMyLibrary = createAsyncThunk(
  "library/getMyLibrary",
  async (_, { getState, rejectWithValue }) => {
    const { auth } = getState();
    const token = auth.token;
    const { user } = getState().auth;

    try {
      const response = await axios.post(
        `${BASE_URL}/user/store/getMyLibrary`,
        {
          student_id: user?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch library"
      );
    }
  }
);

const initialState = {
  books: [],
  isLoading: false,
  error: null,
};

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    clearLibraryError: (state) => {
      state.error = null;
    },
    resetLibrary: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyLibrary.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getMyLibrary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = Array.isArray(action.payload?.message)
          ? action.payload.message
          : [];
      })
      .addCase(getMyLibrary.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.books = [];
      });
  },
});

export const { clearLibraryError, resetLibrary } = librarySlice.actions;
export default librarySlice;
