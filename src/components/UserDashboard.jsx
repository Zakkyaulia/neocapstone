// src/components/UserDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";

function UserDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div className="page-container">
      <div className="info-box">
        
        <div className="web-title">UNAND Competition Hub</div>
        <div className="subtitle">Selamat Datang, {user?.name || "Mahasiswa"}!</div>
      </div>

      <div className="form-box">
        <h2>Daftar Lomba Tersedia</h2>
        <p>
          Silakan lihat informasi lomba yang tersedia di halaman publik:
        </p>
        <button onClick={() => navigate("/lomba")}>Lihat Lomba</button>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserDashboard;
