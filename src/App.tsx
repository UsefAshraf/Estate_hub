// src/App.tsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
//import Propertydetail from "./components/Propertydetail/propertydetail";
import UserManagement from "./pages/admin/usermanagement";
//import AppRoutes from "./routes/AppRoutes";
//import Navbar from "./components/Navbar/Navbar";
//import Footer from "./components/Footer/Footer"; // import Footer

const App: React.FC = () => {
  return (
    <Router>
      
      <UserManagement></UserManagement>
    </Router>
  );
};

export default App;
