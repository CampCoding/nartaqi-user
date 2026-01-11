import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  data: {
    url: "",
    title: "",
    summary: "",
    image: "",
  },
};

const shareSlice = createSlice({
  name: "share",
  initialState,
  reducers: {
    openShare: (state, action) => {
      state.open = true;
      state.data = {
        url: action.payload?.url || "",
        title: action.payload?.title || "",
        summary: action.payload?.summary || "",
        image: action.payload?.image || "",
      };
    },
    closeShare: (state) => {
      state.open = false;
      // اختيارى: تصفير الداتا عند الإغلاق
      state.data = { ...initialState.data };
    },
    setShareData: (state, action) => {
      state.data = { ...state.data, ...(action.payload || {}) };
    },
  },
});

export const { openShare, closeShare, setShareData } = shareSlice.actions;
export default shareSlice.reducer;
