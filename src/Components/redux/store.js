import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import contactsSlice, { filter } from "./contacts/contact-reducer";
import authSlice from "./auth/auth-reducer";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authSlice),
    contacts: contactsSlice,
    filter: filter,
  },

  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ serializableCheck: false }),
  ],
  devTools: process.env.NODE_ENV === "development",
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);
