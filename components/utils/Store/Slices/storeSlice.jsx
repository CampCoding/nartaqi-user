import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getStoreItems = createAsyncThunk(
  "store/getStoreItems",
  async (
    {
      perPage = 10,
      page = 1,
      category = "",
      sort = "",
      minPrice = 0,
      maxPrice = 1000,
    },
    { getState, rejectWithValue }
  ) => {
    const { auth } = getState();
    const token = auth.token;

    try {
      let url = `${BASE_URL}/user/store/getStoreItems?perPage=${perPage}&page=${page}`;

      if (category && category !== "all") {
        url += `&categoryFilter=${category}`;
      }
      if (sort) {
        url += `&filter=${sort}`;
      }
      // if (minPrice > 0) {
      //   url += `&minPrice=${minPrice}`;
      // }
      if (maxPrice < 1000) {
        url += `&priceFilter=${maxPrice}`;
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch store items"
      );
    }
  }
);

const initialState = {
  items: [],
  highest_price: "",
  pagination: {
    currentPage: 1,
    lastPage: 1,
    perPage: 10,
    total: 0,
    from: 0,
    to: 0,
  },
  isLoading: false,
  error: null,
};

const storeSlice = createSlice({
  name: "store",
  initialState,

  reducers: {
    clearStoreError: (state) => {
      state.error = null;
    },
    resetStore: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getStoreItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getStoreItems.fulfilled, (state, action) => {
        state.isLoading = false;
        const data = action.payload.message?.items;
        state.items = data.data || [];
        state.highest_price = action.payload?.message?.highest_price;
        state.pagination = {
          currentPage: data.current_page,
          lastPage: data.last_page,
          perPage: data.per_page,
          total: data.total,
          from: data.from,
          to: data.to,
        };
      })
      .addCase(getStoreItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearStoreError, resetStore } = storeSlice.actions;
export default storeSlice;
