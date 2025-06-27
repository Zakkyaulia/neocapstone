import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Import komponen
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import CompetitionList from "./components/CompetitionList";
import CompetitionDetail from "./components/CompetitionDetail";
import PublicLombaPage from "./components/PublicLombaPage";

// Import global styling (jika masih digunakan)
import "./App.css";

function App() {
  // Ambil data user dari localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  
  return (
    <Router>
      <div className="app-container">
        <Navbar user={user} />
        
        <Routes>
          {/* Halaman utama (publik) */}
          <Route path="/" element={<PublicLombaPage />} />

          {/* Halaman login dan register */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />

          {/* Halaman daftar lomba (untuk semua) */}
          <Route path="/lomba" element={<CompetitionList />} />
          <Route path="/lomba/:id" element={<CompetitionDetail />} />

          {/* Halaman dashboard khusus admin */}
          <Route
            path="/admin-dashboard"
            element={
              user?.role === "admin" ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Halaman dashboard khusus user */}
          <Route
            path="/user-dashboard"
            element={
              user?.role === "user" ? (
                <UserDashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Jika URL tidak ditemukan, redirect ke halaman utama */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
