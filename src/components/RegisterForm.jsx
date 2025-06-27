import React, { useState } from "react";
import "../styles/RegisterForm.css";

function RegisterForm({ onRegister }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }

    if (!formData.email || !formData.password) {
      setError("Mohon lengkapi semua data.");
      return;
    }

    onRegister(formData); // panggil prop dari parent
    setFormData({ email: "", password: "", confirmPassword: "" });
    setError("");
  };

  return (
    <div className="register-page">
      <div className="form-box">
        <h2>Daftar Akun</h2>
        <p className="subtitle">Buat akun untuk menyampaikan aspirasi</p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Alamat Email"
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Konfirmasi Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit">Daftar</button>
        </form>

        <p>
          Sudah punya akun? <a href="/login">Login di sini</a>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;
