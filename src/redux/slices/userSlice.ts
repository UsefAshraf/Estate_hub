
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";


interface UserState {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  role : "admin"|"buyer"|"seller"|"user";
  imag?: string;
};

const initialState: UserState = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  role : 'user',
  imag: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload }; 
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
