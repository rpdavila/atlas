"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/ReduxSSR/store";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";

export function Providers({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time it renders
    storeRef.current = makeStore();
  }
  const persistor = persistStore(storeRef.current);

  storeRef.current.dispatch(getStudents())
  storeRef.current.dispatch(getDropDownList())
  storeRef.current.dispatch(getInstruments())
  storeRef.current.dispatch(getCustomUserData())

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}
