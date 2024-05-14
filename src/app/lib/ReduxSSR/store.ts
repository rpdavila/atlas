
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
import storage from "redux-persist/lib/storage";
import rootReducer from "./features/rootReducer";
import logger from "redux-logger";


const persistConfig = {
  key: "root",
  storage,
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
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
      devTools: process.env.NODE_ENV !== "production",    
    })
    store.__persistor = persistStore(store);
    return store
  }
}  

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch']

