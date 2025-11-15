"use client";
import React from "react";
import { Provider } from "react-redux";
import { persistor, store } from "./Index.jsx";
import { PersistGate } from "redux-persist/integration/react";

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>  
    </Provider>
  );
}
