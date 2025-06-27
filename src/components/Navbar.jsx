import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/logo-unand.png" alt="UNAND" className="logo" />
        <span className="navbar-title">UNAND Competition Hub</span>
      </div>

      <div className="navbar-right">
        {user?.role === "admin" && (
          <>
            <Link to="/admin-dashboard" className="nav-link">Dashboard Admin</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        )}
        {user?.role === "user" && (
          <>
            <Link to="/user-dashboard" className="nav-link">Dashboard</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        )}
        {!user && (
          <Link to="/login" className="nav-link">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
