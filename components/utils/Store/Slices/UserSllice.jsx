import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
console.log(baseUrl);

export const getUserDate = createAsyncThunk(
  "user/getUserDate",
  async (data, { rejectWithValue, dispatch }) => {
    console.log(data);

    try {
      const res = await axios.post(
        `${baseUrl}/authentication/student_info`,
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${data}`,
          },
        }
      );

      console.log("data get");

      return res.data;
    } catch (error) {
      if (error.response.status === 401) {
        toast.error("يرجي تسجيل الدخول ");
      }
      return rejectWithValue(error.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: { user: {}, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserDate.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUserDate.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getUserDate.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export default userSlice;
