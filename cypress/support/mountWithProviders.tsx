import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { mount } from "cypress/react";
import rootReducer from "@/lib/ReduxSSR/features/rootReducer";
import React from "react";

export function mountWithProviders(
  ui: React.ReactNode,
  {   
    session=null,
    preloadedState = {},
    store = configureStore({reducer: rootReducer, preloadedState}),
  } = {}
){
	return mount(
    <SessionProvider session={session}>
      <ReduxProvider store={store}>
        {ui}
      </ReduxProvider>
    </SessionProvider>
  )
}