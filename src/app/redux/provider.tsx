"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/ReduxSSR/store";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "../components/loading/loading";

export function Providers({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time it renders
    storeRef.current = makeStore();
  }
  
  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={<Loading/>} persistor={storeRef.current.__persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}
