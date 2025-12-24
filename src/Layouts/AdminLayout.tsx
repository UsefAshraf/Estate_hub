// layouts/MainLayout.tsx
import AdminNavbar from "@/components/Navbar/AdminNavbar";
import Footer from "../components/Footer/footer";
import React from "react";
import { Outlet } from "react-router-dom";

const AdminLayout: React.FC = () => (
  <div>
    <AdminNavbar />
    <main className="pt-18"> {/* 20 * 4px = 80px, adjust to navbar height */}
      <Outlet />
    </main> 
    <Footer />
  </div>
);

export default AdminLayout;


