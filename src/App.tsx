// src/App.tsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
//import Navbar from "./components/Navbar/Navbar";
//import Footer from "./components/Footer/Footer"; // import Footer

const App: React.FC = () => {
  return (
    <Router>
      {/* <Navbar /> */}
      <div className="mt-4">
        <AppRoutes />
      </div>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
