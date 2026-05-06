import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const submitRoundRate = createAsyncThunk(
  "rateRound/submitRoundRate",
  async (payload, { getState, rejectWithValue }) => {
    const { auth } = getState();
    const token = auth.token;

    try {
      const response = await axios.post(
        `${BASE_URL}/user/rounds/makeRoundRate`,
        payload,
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
        error.response?.data?.message || "Failed to submit rating"
      );
    }
  }
);

const initialState = {
  isSubmitting: false,
  error: null,
  success: false,
};

const rateRoundSlice = createSlice({
  name: "rateRound",
  initialState,
  reducers: {
    resetRateState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitRoundRate.pending, (state) => {
        state.isSubmitting = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitRoundRate.fulfilled, (state) => {
        state.isSubmitting = false;
        state.success = true;
      })
      .addCase(submitRoundRate.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetRateState } = rateRoundSlice.actions;
export default rateRoundSlice;
