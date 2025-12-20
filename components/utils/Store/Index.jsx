import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import authSlice from "./Slices/authntcationSlice.jsx";
import userSlice from "./Slices/UserSllice.jsx";
import blogSlice from "./Slices/BlogSlice.jsx";
import redirectSlice from "./Slices/redirectSlice.jsx";
import cartSlice from "./Slices/cartSlice.jsx";
import storeSlice from "./Slices/storeSlice.jsx";
import examReducer from "./Slices/examSlice";
import mockExamReducer from "./Slices/mockExamSlice.js";
import shareReducer from "./Slices/shareSlice.js"
import videoModalReducer from "./Slices/videoModalSlice.js"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart"],
};

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  user: userSlice.reducer,
  blog: blogSlice.reducer,
  redirect: redirectSlice.reducer,
  cart: cartSlice.reducer,
  store: storeSlice.reducer,
  exam: examReducer,
  mockExam: mockExamReducer,
  share: shareReducer,
  videoModal: videoModalReducer,

});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
