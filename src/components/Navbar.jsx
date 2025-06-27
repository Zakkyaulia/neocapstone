// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar({ isLoggedIn, userRole, setIsLoggedIn, setUserRole }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/logo-unand.png" alt="Unand Logo" />
        <span>Portal Aspirasi Universitas Andalas</span>
      </div>
      <div className="nav-links">
        <Link to="/">Beranda</Link>
        {isLoggedIn && userRole === "user" && <Link to="/kirim">Kirim Aspirasi</Link>}
        {isLoggedIn && userRole === "admin" && <Link to="/admin">Dashboard</Link>}
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
