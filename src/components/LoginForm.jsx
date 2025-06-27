// src/components/LoginForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      storedUser.email === formData.email &&
      storedUser.password === formData.password
    ) {
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("currentUser", JSON.stringify(storedUser));

      if (storedUser.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } else {
      setError("Email atau password salah.");
    }
  };

  return (
    <div className="page-container">
      <div className="info-box">
        <img src="/logo-unand.png" alt="Logo UNAND" className="logo-unand" />
        <div className="web-title">UNAND Competition Hub</div>
        <div className="subtitle">Portal Lomba Mahasiswa Universitas Andalas</div>
      </div>

      <div className="form-box">
        <h2>Login</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Masuk</button>
        </form>
        <p>
          Belum punya akun? <a href="/register">Daftar di sini</a>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
