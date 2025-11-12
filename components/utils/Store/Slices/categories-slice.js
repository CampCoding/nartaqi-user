import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
console.log(baseUrl);

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  /**
   * params example: { per_page: 2, page: 5 }
   */
  async (params, thunkAPI) => {
    try {
      const res = await axios.get(
        `${baseUrl}/user/categories/course-categories`,
        {
          params,                 // ✅ puts ?per_page=..&page=..
          signal: thunkAPI.signal, // ✅ supports cancellation
          headers: { Accept: "application/json" },
        }
      );

      // adjust to your API shape if needed
      console.log( "catsRes" ,  res);
      return res.data;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to fetch categories";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// --- helpers: normalize typical API shapes ---
function parseCategoriesPayload(payload) {
  // Support shapes like:
  // 1) { data: [...], meta: { current_page, per_page, total, last_page } }
  // 2) { categories: [...], pagination: { page, per_page, total, last_page } }
  // 3) { records: [...], page, per_page, total, last_page }
  // 4) Bare array: [...]
  let items = [];
  let meta = {
    page: 1,
    per_page: 10,
    total: 0,
    last_page: 1,
  };

  if (Array.isArray(payload)) {
    items = payload;
  } else if (payload?.data && Array.isArray(payload.data)) {
    items = payload.data;
    const m = payload.meta || {};
    meta.page = m.current_page ?? m.page ?? meta.page;
    meta.per_page = m.per_page ?? meta.per_page;
    meta.total = m.total ?? meta.total;
    meta.last_page = m.last_page ?? m.pages ?? meta.last_page;
  } else if (Array.isArray(payload?.categories)) {
    items = payload.categories;
    const p = payload.pagination || {};
    meta.page = p.page ?? meta.page;
    meta.per_page = p.per_page ?? meta.per_page;
    meta.total = p.total ?? meta.total;
    meta.last_page = p.last_page ?? meta.last_page;
  } else if (payload?.records && Array.isArray(payload.records)) {
    items = payload.records;
    meta.page = payload.page ?? meta.page;
    meta.per_page = payload.per_page ?? meta.per_page;
    meta.total = payload.total ?? meta.total;
    meta.last_page = payload.last_page ?? meta.last_page;
  } else if (payload?.items && Array.isArray(payload.items)) {
    items = payload.items;
    // optional meta mapping
    meta.page = payload.page ?? meta.page;
    meta.per_page = payload.per_page ?? meta.per_page;
    meta.total = payload.total ?? meta.total;
    meta.last_page = payload.last_page ?? meta.last_page;
  } else {
    // last resort: try to find the first array in the object
    const firstArray = Object.values(payload || {}).find(Array.isArray);
    if (Array.isArray(firstArray)) items = firstArray;
  }

  return { items, meta };
}

const initialState = {
  items: [],
  loading: false,
  error: null,
  meta: { page: 1, per_page: 10, total: 0, last_page: 1 },
  lastQuery: null, // keep last used params (e.g., {per_page, page})
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    resetCategories(state) {
      state.items = [];
      state.meta = { page: 1, per_page: 10, total: 0, last_page: 1 };
      state.error = null;
      state.loading = false;
      state.lastQuery = null;
    },
    setCategoriesPage(state, action) {
      // useful for UI pagination control
      const nextPage = Number(action.payload) || 1;
      state.meta.page = nextPage;
    },
    clearCategoriesError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        // store the requested params so UI can reflect them
        state.lastQuery = action.meta?.arg || null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        const { items, meta } = parseCategoriesPayload(action.payload);
        console.log(action.payload , "itemsfromState")
        state.items = items;
        // prefer server meta; fallback to requested params
        state.meta = {
          page: meta.page ?? state.lastQuery?.page ?? state.meta.page,
          per_page: meta.per_page ?? state.lastQuery?.per_page ?? state.meta.per_page,
          total: meta.total ?? state.meta.total,
          last_page: meta.last_page ?? state.meta.last_page,
        };
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message || "Failed to fetch categories";
      })
   
  },
});

export const {
  resetCategories,
  setCategoriesPage,
  clearCategoriesError,
} = categoriesSlice.actions;

export default categoriesSlice;

export const selectCategories = (state) => state?.categories?.items;
export const selectCategoriesLoading = (state) => state?.categories?.loading;
export const selectCategoriesError = (state) => state?.categories?.error;
export const selectCategoriesMeta = (state) => state?.categories?.meta;
export const selectCategoriesLastQuery = (state) => state?.categories?.lastQuery;