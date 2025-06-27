// src/components/RegisterForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterForm.css";

function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
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

    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: "user"
    };

    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("loggedIn", true);
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    navigate("/user-dashboard");
  };

  return (
    <div className="page-container">
      <div className="info-box">
        <img src="/logo-unand.png" alt="Logo UNAND" className="logo-unand" />
        <div className="web-title">UNAND Competition Hub</div>
        <div className="subtitle">Portal Lomba Mahasiswa Universitas Andalas</div>
      </div>

      <div className="form-box">
        <h2>Register</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nama Lengkap"
            value={formData.name}
            onChange={handleChange}
            required
          />

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

          <button type="submit">Daftar</button>
        </form>
        <p>
          Sudah punya akun? <a href="/">Login di sini</a>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;
