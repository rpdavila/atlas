
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import rootReducer from "./features/rootReducer";
import { createLogger } from "redux-logger";

const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: string) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

const myStorage = typeof window !== "undefined" ? storage : createNoopStorage();
const logger = createLogger()

const persistConfig = {
  key: "root",
  storage: myStorage 
};

export const makeStore = () => {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return configureStore({
      reducer: rootReducer,
    });
  } else {
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    let store: any = configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware): ReturnType<typeof getDefaultMiddleware> =>
        process.env.NODE_ENV === "production"
        ? getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
          })
        : (getDefaultMiddleware({
          thunk: true,
          serializableCheck: {
              ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }).concat(logger)) as any, // temporarilty fixes the type error   
    })
    store.__persistor = persistStore(store);
    return store
  }
}  

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch']

