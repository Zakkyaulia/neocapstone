import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Password tidak cocok");
      return;
    }

    const newUser = {
      name,
      email,
      password,
      role: "user", // default mahasiswa
    };

    localStorage.setItem("user", JSON.stringify(newUser));
    navigate("/login");
  };

  return (
    <div className="page-container">
      <div className="info-box">
        <img src="/logo-unand.png" alt="Logo Unand" className="logo-unand" />
        <h2 className="web-title">UNAND INFO LOMBA</h2>
        <p className="subtitle">Platform Aspirasi & Informasi Mahasiswa</p>
      </div>

      <div className="form-box">
        <h2>Register</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nama Lengkap"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Konfirmasi Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>
        <p>Sudah punya akun? <a href="/login">Login</a></p>
      </div>
    </div>
  );
}
