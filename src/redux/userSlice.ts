
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";


interface UserState {
  name: string;
  email: string;
  phone: string;
  location: string;
};

const initialState: UserState = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  location: "Los Angeles, CA",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload }; // ⭐ ADDED
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
