import { createSlice , type PayloadAction } from "@reduxjs/toolkit";

type ThemeState = {
    theme: string;
};

const initialState: ThemeState = {
    theme: "dark",
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        changeTheme(state, action: PayloadAction<string>) {
            state.theme = action.payload;
        },
    },
});

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
