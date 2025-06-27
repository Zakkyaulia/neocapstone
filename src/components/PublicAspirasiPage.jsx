// src/components/PublicAspirasiPage.jsx
import React, { useEffect, useState } from "react";
import "../styles/PublicAspirasiPage.css";

function PublicAspirasiPage() {
  const [aspirasiList, setAspirasiList] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("aspirasiList")) || [];
    setAspirasiList(stored);
  }, []);

  return (
    <main className="public-page">
      <h2>Halaman Aspirasi Publik</h2>
      <p>Aspirasi dan saran yang telah disampaikan oleh mahasiswa</p>

      {aspirasiList.length === 0 ? (
        <p className="empty-msg">Belum ada aspirasi yang ditampilkan.</p>
      ) : (
        <ul className="public-aspirasi-list">
          {aspirasiList.map((asp) => (
            <li key={asp.id}>
              <blockquote>{asp.isi}</blockquote>
              <small>{asp.tanggal}</small>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default PublicAspirasiPage;
