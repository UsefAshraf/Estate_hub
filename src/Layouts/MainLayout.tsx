// layouts/MainLayout.tsx
import Footer from "../components/Footer/footer";
import Navbar from "../components/Navbar/navbar";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => (
  <div>
    <Navbar />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default MainLayout;

