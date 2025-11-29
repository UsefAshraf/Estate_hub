// src/App.tsx
import React, { useEffect } from "react";
//import AppRoutes from "./routes/AppRoutes";
import { loadTheme } from "./hooks/ThemeLoader";
import { useAppDispatch } from "./hooks/HooksStore";
import { changeTheme } from "./store/slices/ThemeSlice";
import AppRoutes from "./routes/AppRoutes";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(()=>{
    const theme = loadTheme()
    dispatch(changeTheme(theme));
  },[])
  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
};

export default App;
