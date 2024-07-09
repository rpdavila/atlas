"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/lib/ReduxSSR/store";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import { getInstruments } from "@/lib/ReduxSSR/features/instrumentSLice";
import { getStudents, getDropDownList } from "@/lib/ReduxSSR/features/studentListSlice";
import { useRouter } from "next/navigation";
import { NextUIProvider } from "@nextui-org/react";


export function Providers(
  { 
    children   
  }: 
  { 
    children: React.ReactNode,    
  }) {
  const storeRef = useRef<AppStore>();
  const router = useRouter();
  if (!storeRef.current) {
    // Create the store instance the first time it renders
    storeRef.current = makeStore();
    storeRef.current.dispatch(getStudents());
    storeRef.current.dispatch(getDropDownList());
    storeRef.current.dispatch(getInstruments());
  }


  const persistor = persistStore(storeRef.current);


  return (
    <NextUIProvider navigate={router.push}>
      <Provider store={storeRef.current}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </NextUIProvider>
  )
}
