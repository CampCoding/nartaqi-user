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
      maxPrice,
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
      if (maxPrice && maxPrice > 0) {
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

        const message = action.payload?.message || {};
        const itemsData = message.items;

        // ✅ Handle both cases: paginated object OR plain array
        if (
          itemsData &&
          typeof itemsData === "object" &&
          !Array.isArray(itemsData)
        ) {
          // ✅ Paginated structure (current API response)
          state.items = itemsData.data || [];
          state.pagination = {
            currentPage: itemsData.current_page || 1,
            lastPage: itemsData.last_page || 1,
            perPage: itemsData.per_page || 10,
            total: itemsData.total || 0,
            from: itemsData.from || 0,
            to: itemsData.to || 0,
          };
        } else if (Array.isArray(itemsData)) {
          // ✅ Fallback: plain array
          state.items = itemsData;
          state.pagination = {
            currentPage: 1,
            lastPage: 1,
            perPage: itemsData.length,
            total: itemsData.length,
            from: itemsData.length > 0 ? 1 : 0,
            to: itemsData.length,
          };
        } else {
          state.items = [];
          state.pagination = initialState.pagination;
        }

        state.highest_price = message.highest_price || "";
      })
      .addCase(getStoreItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.items = [];
      });
  },
});

export const { clearStoreError, resetStore } = storeSlice.actions;
export default storeSlice;
