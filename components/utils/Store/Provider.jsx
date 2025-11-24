"use client";

import { Provider } from "react-redux";
import { getQueryClient, queryClient } from "../../../lib/getQueryClient";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./Index";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          {children}

          {/* اختياري للقيم - Devtools */}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
