import { configureStore } from "@reduxjs/toolkit";
import { userInfoSlice } from "./slices/userInfo";

export const store = configureStore({
  reducer: {
    userInfo: userInfoSlice.reducer,
  },
});

export type StoreStateType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;
