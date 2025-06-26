import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import AdminDashboard from "./pages/AdminDashboard";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  // Cek jika ada akun admin, kalau belum maka buat
  useEffect(() => {
    const existingUser = localStorage.getItem("user");
    if (!existingUser) {
      const adminAccount = {
        name: "Admin UNAND",
        email: "admin@unand.ac.id",
        password: "admin123",
        role: "admin",
      };
      localStorage.setItem("user", JSON.stringify(adminAccount));
    }
  }, []);

  // Ambil data user dari localStorage
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Halaman Login */}
        <Route path="/login" element={<LoginForm />} />

        {/* Halaman Registrasi */}
        <Route path="/register" element={<RegisterForm />} />

        {/* Dashboard Admin */}
        <Route
          path="/admin-dashboard"
          element={
            user && user.role === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Dashboard User (Placeholder untuk nanti) */}
        <Route
          path="/user-dashboard"
          element={
            user && user.role === "user" ? (
              <h2 style={{ textAlign: "center" }}>Welcome, {user.name} 👋</h2>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Default Route */}
        <Route
          path="/"
          element={
            user ? (
              user.role === "admin" ? (
                <Navigate to="/admin-dashboard" />
              ) : (
                <Navigate to="/user-dashboard" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
