
import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";


import storage from './storage' // defaults to localStorage for web

import rootReducer from "./features/rootReducer";
import { createLogger } from "redux-logger";


const logger = createLogger()

const persistConfig = {
  key: "root",
  version: 1,
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });  
};  

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch']

