// src/components/layout/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from "@/components/layout/Footer/Footer";
import Navbar from "@/components/layout/NavBar/NavBar";

export default function Layout() {
  return (
    <div className="app-container">
      {/* 1. The Navbar stays at the top */}
      <Navbar />

      {/* 2. The Outlet is where Home, About, etc. will appear */}
      <main>
        <Outlet />
      </main>

      {/* 3. The Footer stays at the bottom */}
      <Footer />
    </div>
  );
}