import { configureStore } from "@reduxjs/toolkit";
import { userInfoSlice } from "./slices/userInfo";
import { staffDataSlice } from "./slices/staffData";

export const store = configureStore({
  reducer: {
    userInfo: userInfoSlice.reducer,
    staffData: staffDataSlice.reducer,
  },
});

export type StoreStateType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;
