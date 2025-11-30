import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUserCart = createAsyncThunk(
  "cart/getUserCart",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth.token;

      const response = await axios.get(`${BASE_URL}/user/cart/user_cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart"
      );
    }
  }
);


export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { type, item_id, quantity = 1, loading = false },
    { getState, rejectWithValue }
  ) => {
    try {
      const { auth } = getState();
      const token = auth.token;

      const response = await axios.post(
        `${BASE_URL}/user/cart/cart_toggle`,
        { type, item_id, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return { ...response.data, type, item_id, quantity };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add to cart"
      );
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async (
    { type, item_id, quantity, loading = false },
    { getState, rejectWithValue }
  ) => {
    try {
      const { auth } = getState();
      const token = auth.token;

      const response = await axios.post(
        `${BASE_URL}/user/cart/cart_toggle`,
        { type, item_id, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return { ...response.data, type, item_id, quantity };
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to update quantity",
        type,
        item_id,
        quantity,
      });
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ type, item_id, loading = false }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth.token;

      console.log("🗑️ Removing from cart:", { type, item_id });

      const response = await axios.post(
        `${BASE_URL}/user/cart/cart_toggle`,
        { type, item_id }, // ✅ No quantity = remove item
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return { ...response.data, type, item_id };
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to remove from cart",
        type,
        item_id,
      });
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ type, item_id, loading = false }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth.token;

      console.log("🗑️ Deleting cart item:", { type, item_id });

      const response = await axios.post(
        `${BASE_URL}/user/cart/delete_cart_item`,
        { type, item_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return { ...response.data, type, item_id };
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to delete cart item",
        type,
        item_id,
      });
    }
  }
);

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

const getItemPrice = (item) => {
  switch (item.type) {
    case "rounds":
      return item.round?.price || 0;
    case "books":
      return item.store?.price || 0;
    case "bags":
      return item.store?.price || 0;
    case "accessories":
      return item.store?.price || 0;
    default:
      return item.price || 0;
  }
};

const calculateTotals = (items) => ({
  totalItems: items.reduce((total, item) => total + item.quantity, 0),
  totalPrice: items.reduce(
    (total, item) => total + getItemPrice(item) * item.quantity,
    0
  ),
});

const findItemIndex = (items, type, item_id) => {
  return items.findIndex(
    (item) => item.type === type && item.item_id === item_id
  );
};

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  isLoading: false,
  isAdding: false,
  isRemoving: false,
  isDeleting: false,
  removingItem: null,
  error: null,
  successMessage: null,
  previousItems: [],
};

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
      const { type, item_id, quantity } = action.payload;
      state.previousItems = JSON.parse(JSON.stringify(state.items));

      const itemIndex = findItemIndex(state.items, type, item_id);
      if (itemIndex !== -1) {
        state.items[itemIndex].quantity = quantity;
        const totals = calculateTotals(state.items);
        state.totalItems = totals.totalItems;
        state.totalPrice = totals.totalPrice;
      }
    },

    removeItemLocally: (state, action) => {
      const { type, item_id } = action.payload;
      state.previousItems = JSON.parse(JSON.stringify(state.items));

      state.items = state.items.filter(
        (item) => !(item.type === type && item.item_id === item_id)
      );
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
        if (action.meta.arg.loading) {
          state.isRemoving = true;
          state.removingItem = {
            type: action.meta.arg.type,
            item_id: action.meta.arg.item_id,
          };
        }
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state) => {
        state.isRemoving = false;
        state.removingItem = null;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isRemoving = false;
        state.removingItem = null;
        state.error = action.payload?.message || "فشل حذف العنصر";
      })

      // ==================== DELETE CART ITEM ====================
      .addCase(deleteCartItem.pending, (state, action) => {
        if (action.meta.arg.loading) {
          state.isRemoving = true;
          state.removingItem = {
            type: action.meta.arg.type,
            item_id: action.meta.arg.item_id,
          };
        }
        state.error = null;
      })
      .addCase(deleteCartItem.fulfilled, (state) => {
        state.isRemoving = false;
        state.removingItem = null;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.isRemoving = false;
        state.removingItem = null;
        state.error = action.payload?.message || "فشل حذف العنصر";
      })

      // ==================== DELETE CART ====================
      .addCase(deleteCart.pending, (state, action) => {
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
