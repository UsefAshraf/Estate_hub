
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";


interface UserState {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  imag: string;
};

const initialState: UserState = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  imag: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload }; // ⭐ ADDED
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
