import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  data: {
    title: "",
    vimeoId: "",
    youtubeId: "",
    autoplay: true,
  },
};

const videoModalSlice = createSlice({
  name: "videoModal",
  initialState,
  reducers: {
    // open video without modal
    openVideo: (state, action) => {
      state.data = {
        title: action.payload?.title || "",
        vimeoId: action.payload?.vimeoId || "",
        youtubeId: action.payload?.youtubeId || "",
        autoplay: action.payload?.autoplay ?? true,
      };
    },

    openVideoModal: (state, action) => {
      state.open = true;
      state.data = {
        title: action.payload?.title || "",
        vimeoId: action.payload?.vimeoId || "",
        youtubeId: action.payload?.youtubeId || "",
        autoplay: action.payload?.autoplay ?? true,
      };
    },
    closeVideoModal: (state) => {
      state.open = false;
      state.data = { ...initialState.data };
    },
    setVideoModalData: (state, action) => {
      state.data = { ...state.data, ...(action.payload || {}) };
    },
  },
});

export const { openVideoModal, closeVideoModal, setVideoModalData, openVideo } =
  videoModalSlice.actions;

export default videoModalSlice.reducer;
