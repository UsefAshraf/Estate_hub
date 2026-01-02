import { changeTheme } from "../store/slices/ThemeSlice";

export const toggleTheme =
  () =>
  (dispatch: any, getState: any) => {
    const current = getState().theme.theme;
    const next = current === "dark" ? "light" : "dark";

    // Update Redux
    dispatch(changeTheme(next));

    // Update DOM
    document.documentElement.classList.toggle("dark", next === "dark");

    // Save to localStorage
    localStorage.setItem("theme", next);
  };
