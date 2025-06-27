// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import AspirasiForm from "./components/AspirasiForm";
import AdminDashboard from "./components/AdminDashboard";
import PublicAspirasiPage from "./components/PublicAspirasiPage";

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar
          isLoggedIn={isLoggedIn}
          userRole={userRole}
          setIsLoggedIn={setIsLoggedIn}
          setUserRole={setUserRole}
        />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<PublicAspirasiPage />} />

            <Route
              path="/login"
              element={
                isLoggedIn ? (
                  <Navigate to={userRole === "admin" ? "/admin" : "/kirim"} />
                ) : (
                  <LoginForm onLogin={handleLogin} />
                )
              }
            />

            <Route
              path="/register"
              element={
                isLoggedIn ? <Navigate to="/" /> : <RegisterForm onLogin={handleLogin} />
              }
            />

            <Route
              path="/kirim"
              element={
                isLoggedIn && userRole === "user" ? (
                  <AspirasiForm
                    onSubmit={(newAsp) => {
                      const existing =
                        JSON.parse(localStorage.getItem("aspirasiList")) || [];
                      localStorage.setItem(
                        "aspirasiList",
                        JSON.stringify([...existing, newAsp])
                      );
                    }}
                  />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/admin"
              element={
                isLoggedIn && userRole === "admin" ? (
                  <AdminDashboard />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/* Catch-all for unknown routes */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
