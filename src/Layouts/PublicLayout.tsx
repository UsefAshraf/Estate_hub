// layouts/PublicLayout.tsx
import PublicNavbar from "@/components/Navbar/PublicNavbar";
import Footer from "../components/Footer/footer";
import React from "react";
import { Outlet } from "react-router-dom";

const PublicLayout: React.FC = () => (
  <div>
    <PublicNavbar />
    <main className="pt-18"> {/* Adjust to navbar height */}
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default PublicLayout;