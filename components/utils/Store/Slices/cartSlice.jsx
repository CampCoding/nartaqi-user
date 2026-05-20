import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// ==================== GET USER CART ====================
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

// ==================== ADD TO CART ====================
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

// ==================== UPDATE QUANTITY ====================
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

// ==================== REMOVE FROM CART ====================
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ type, item_id, loading = false }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth.token;

      const response = await axios.post(
        `${BASE_URL}/user/cart/cart_toggle`,
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
        message: error.response?.data?.message || "Failed to remove from cart",
        type,
        item_id,
      });
    }
  }
);

// ==================== DELETE CART ITEM ====================
export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ type, item_id, loading = false }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth.token;

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

// ==================== DELETE CART ====================
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

// ==================== CHECK COUPON ====================
export const checkCoupon = createAsyncThunk(
  "cart/checkCoupon",
  async ({ code, target, round_id }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth.token;

      const payload = { code, target };
      if (target === "rounds" && round_id) {
        payload.round_id = round_id;
      }

      const response = await axios.post(
        `${BASE_URL}/payment/coupons/check`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "كود الكوبون غير صحيح"
      );
    }
  }
);

// ==================== CHECK STORE COUPON ====================
export const checkStoreCoupon = createAsyncThunk(
  "cart/checkStoreCoupon",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth.token;

      const response = await axios.get(
        `${BASE_URL}/user/store/hasStoreCoupon`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.message; // { has_coupon: 1 }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to check store coupon"
      );
    }
  }
);

// ==================== PAY CART ====================
export const payCart = createAsyncThunk(
  "cart/payCart",
  async ({ couponCode } = {}, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const token = auth.token;

      const payload = {};
      if (couponCode) {
        payload.copounData = { code: couponCode };
      }

      const response = await axios.post(
        `${BASE_URL}/payment/fawaterk/payCart`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "فشل في إتمام الدفع"
      );
    }
  }
);

// ==================== CREATE COURSE INVOICE ====================
export const createCourseInvoice = createAsyncThunk(
  "cart/createCourseInvoice",
  async (
    { round, user, couponCode, couponDiscount, finalPrice },
    { getState, rejectWithValue }
  ) => {
    try {
      const { auth } = getState();
      const token = auth.token;

      const payload = {
        student_id: user.id,
        round_id: round.id,
        userData: {
          full_name: user.name,
          phone: user.phone,
        },
        total_price: Number(finalPrice).toFixed(2),
        items: [
          {
            productData: { name: round.name },
            priceAfterDiscount: Number(finalPrice).toFixed(2),
            quantity: 1,
          },
        ],
      };

      if (couponCode && couponDiscount > 0) {
        payload.copounDiscount = Number(couponDiscount).toFixed(2);
        payload.copounData = { code: couponCode };
      }

      const response = await axios.post(
        `${BASE_URL}/payment/fawaterk/createInvoice`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "فشل في إنشاء الفاتورة"
      );
    }
  }
);

// ==================== HELPERS ====================
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

// ==================== INITIAL STATE ====================
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

  // ✅ Coupon state
  coupon: null,
  isCheckingCoupon: false,
  couponError: null,
  hasStoreCoupon: false,

  // ✅ Payment state
  isPaying: false,
  paymentError: null,
  paymentUrl: null,
};

// ==================== SLICE ====================
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

        if (state.coupon) {
          state.coupon = null;
          state.couponError = null;
        }
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

      if (state.coupon) {
        state.coupon = null;
        state.couponError = null;
      }
    },

    clearCartLocally: (state) => {
      state.previousItems = JSON.parse(JSON.stringify(state.items));
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
      state.coupon = null;
      state.couponError = null;
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

    clearCoupon: (state) => {
      state.coupon = null;
      state.couponError = null;
    },

    clearPayment: (state) => {
      state.paymentUrl = null;
      state.paymentError = null;
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
      .addCase(addToCart.fulfilled, (state) => {
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
        state.coupon = null;
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.payload || "فشل حذف السلة";
      })

      // ==================== CHECK COUPON ====================
      .addCase(checkCoupon.pending, (state) => {
        state.isCheckingCoupon = true;
        state.couponError = null;
      })
      .addCase(checkCoupon.fulfilled, (state, action) => {
        state.isCheckingCoupon = false;
        state.coupon = action.payload;
        state.successMessage = "تم تطبيق الكوبون بنجاح!";
      })
      .addCase(checkCoupon.rejected, (state, action) => {
        state.isCheckingCoupon = false;
        state.couponError = action.payload;
        state.coupon = null;
      })

      // ==================== CHECK STORE COUPON ====================
      .addCase(checkStoreCoupon.fulfilled, (state, action) => {
        state.hasStoreCoupon = action.payload?.has_coupon === 1;
      })
      .addCase(checkStoreCoupon.rejected, (state) => {
        state.hasStoreCoupon = false;
      })

      // ==================== PAY CART ====================
      .addCase(payCart.pending, (state) => {
        state.isPaying = true;
        state.paymentError = null;
      })
      .addCase(payCart.fulfilled, (state, action) => {
        state.isPaying = false;
        state.paymentUrl = action.payload.url;
      })
      .addCase(payCart.rejected, (state, action) => {
        state.isPaying = false;
        state.paymentError = action.payload;
      })

      // ==================== CREATE COURSE INVOICE ====================
      .addCase(createCourseInvoice.pending, (state) => {
        state.isPaying = true;
        state.paymentError = null;
      })
      .addCase(createCourseInvoice.fulfilled, (state, action) => {
        state.isPaying = false;
        state.paymentUrl = action.payload.url;
      })
      .addCase(createCourseInvoice.rejected, (state, action) => {
        state.isPaying = false;
        state.paymentError = action.payload;
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
  clearCoupon,
  clearPayment,
} = cartSlice.actions;

export default cartSlice;