// Slices/cartSlice.jsx

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// ✅ Get User Cart
export const getUserCart = createAsyncThunk(
  "cart/getUserCart",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth.token;

      const response = await axios.post(
        `${BASE_URL}/user/cart/user_cart`,
        {},
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
        error.response?.data?.message || "Failed to fetch cart"
      );
    }
  }
);

// ✅ Add To Cart (with optional loading)
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { round_id, quantity = 1, loading = false },
    { getState, rejectWithValue }
  ) => {
    try {
      const { auth } = getState();
      const token = auth.token;

      const response = await axios.post(
        `${BASE_URL}/user/cart/cart_toggle`,
        { round_id, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return { ...response.data, round_id, quantity };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add to cart"
      );
    }
  }
);

// ✅ Update Cart Quantity (with optional loading)
export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async (
    { round_id, quantity, loading = false },
    { getState, rejectWithValue }
  ) => {
    try {
      const { auth } = getState();
      const token = auth.token;

      const response = await axios.post(
        `${BASE_URL}/user/cart/cart_toggle`,
        { round_id, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return { ...response.data, round_id, quantity };
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to update quantity",
        round_id,
        quantity,
      });
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ round_id, loading = false }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth.token;

      console.log("🗑️ Removing from cart, round_id:", round_id); // Debug

      const response = await axios.post(
        `${BASE_URL}/user/cart/delete_cart_item`,
        { round_id }, // ✅ This is what gets sent
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return { ...response.data, round_id };
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to remove from cart",
        round_id,
      });
    }
  }
);

// ✅ Delete Entire Cart (with optional loading)
export const deleteCart = createAsyncThunk(
  "cart/deleteCart",
  async ({ loading = false } = {}, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth.token;

      const response = await axios.post(
        `${BASE_URL}/user/cart/delete_cart`,
        {},
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
        error.response?.data?.message || "Failed to delete cart"
      );
    }
  }
);

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  isLoading: false,
  isAdding: false,
  isRemoving: false,
  isDeleting: false,
  removingItemId: null,
  error: null,
  successMessage: null,
  previousItems: [],
};

const calculateTotals = (items) => ({
  totalItems: items.reduce((total, item) => total + item.quantity, 0),
  totalPrice: items.reduce(
    (total, item) => total + (item.round?.price || 0) * item.quantity,
    0
  ),
});

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    clearCartMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },

    resetCart: () => initialState,

    updateQuantityLocally: (state, action) => {
      const { round_id, quantity } = action.payload;
      state.previousItems = JSON.parse(JSON.stringify(state.items));

      const item = state.items.find((item) => item.round_id === round_id);
      if (item) {
        item.quantity = quantity;
        const totals = calculateTotals(state.items);
        state.totalItems = totals.totalItems;
        state.totalPrice = totals.totalPrice;
      }
    },

    removeItemLocally: (state, action) => {
      const round_id = action.payload;
      state.previousItems = JSON.parse(JSON.stringify(state.items));

      state.items = state.items.filter((item) => item.round_id !== round_id);
      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;
    },

    clearCartLocally: (state) => {
      state.previousItems = JSON.parse(JSON.stringify(state.items));
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },

    rollbackCart: (state) => {
      if (state.previousItems.length > 0) {
        state.items = state.previousItems;
        const totals = calculateTotals(state.items);
        state.totalItems = totals.totalItems;
        state.totalPrice = totals.totalPrice;
        state.previousItems = [];
      }
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      // ==================== GET USER CART ====================
      .addCase(getUserCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.message || [];
        const totals = calculateTotals(state.items);
        state.totalItems = totals.totalItems;
        state.totalPrice = totals.totalPrice;
        state.previousItems = [];
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ==================== ADD TO CART ====================
      .addCase(addToCart.pending, (state, action) => {
        // ✅ Check if loading flag is true
        if (action.meta.arg.loading) {
          state.isAdding = true;
        }
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isAdding = false;
        state.successMessage = "تمت الإضافة للسلة بنجاح!";
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isAdding = false;
        state.error = action.payload;
      })

      // ==================== UPDATE QUANTITY ====================
      .addCase(updateCartQuantity.pending, (state, action) => {
        // ✅ Check if loading flag is true
        if (action.meta.arg.loading) {
          state.isAdding = true;
        }
        state.error = null;
      })
      .addCase(updateCartQuantity.fulfilled, (state) => {
        state.isAdding = false;
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.isAdding = false;
        state.error = action.payload?.message || "فشل تحديث الكمية";
      })

      // ==================== REMOVE FROM CART ====================
      .addCase(removeFromCart.pending, (state, action) => {
        // ✅ Check if loading flag is true
        if (action.meta.arg.loading) {
          state.isRemoving = true;
          state.removingItemId = action.meta.arg.round_id;
        }
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state) => {
        state.isRemoving = false;
        state.removingItemId = null;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isRemoving = false;
        state.removingItemId = null;
        state.error = action.payload?.message || "فشل حذف العنصر";
      })

      // ==================== DELETE CART ====================
      .addCase(deleteCart.pending, (state, action) => {
        // ✅ Check if loading flag is true
        if (action.meta.arg?.loading) {
          state.isDeleting = true;
        }
        state.error = null;
      })
      .addCase(deleteCart.fulfilled, (state) => {
        state.isDeleting = false;
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.payload || "فشل حذف السلة";
      });
  },
});

export const {
  clearCartMessages,
  resetCart,
  updateQuantityLocally,
  removeItemLocally,
  clearCartLocally,
  rollbackCart,
  setError,
} = cartSlice.actions;

export default cartSlice;
