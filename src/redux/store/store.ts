import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice"; // ⭐ ADDED

const store = configureStore({
  reducer: {
    user: userReducer, // ⭐ ADDED
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
