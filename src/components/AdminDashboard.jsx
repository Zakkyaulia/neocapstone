import React, { useEffect, useState } from "react";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
  const [aspirasiList, setAspirasiList] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("aspirasiList")) || [];
    setAspirasiList(stored);
  }, []);

  const handleDelete = (id) => {
    const updated = aspirasiList.filter((item) => item.id !== id);
    setAspirasiList(updated);
    localStorage.setItem("aspirasiList", JSON.stringify(updated));
  };

  return (
    <div className="admin-dashboard">
      <h2>Dashboard Admin</h2>
      <p>Kelola aspirasi/saran dari mahasiswa</p>

      {aspirasiList.length === 0 ? (
        <p className="empty-msg">Belum ada aspirasi yang dikirim.</p>
      ) : (
        <ul className="aspirasi-list">
          {aspirasiList.map((aspirasi) => (
            <li key={aspirasi.id}>
              <p className="aspirasi-isi">"{aspirasi.isi}"</p>
              <small className="aspirasi-tanggal">{aspirasi.tanggal}</small>
              <button onClick={() => handleDelete(aspirasi.id)}>Hapus</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminDashboard;
