import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginForm.css";

function LoginForm({ onLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = formData;
    if (email === "admin@example.com" && password === "admin123") {
      onLogin("admin");
      navigate("/admin");
    } else if (email === "user@example.com" && password === "user123") {
      onLogin("user");
      navigate("/kirim");
    } else {
      setError("Email atau password salah.");
    }
  };

  return (
    <div className="login-page">
      <div className="form-box">
        <h2>Login</h2>
        <p className="subtitle">Masuk untuk mengirim aspirasi</p>

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
