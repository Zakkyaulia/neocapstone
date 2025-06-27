import React, { useEffect, useState } from "react";
import "./PublicLombaPage.css";

const PublicLombaPage = () => {
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("competitions");
    if (stored) {
      setCompetitions(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="page-container">
      <div className="info-box">
        
        <h1 className="web-title">UNAND Competition Hub</h1>
        <p className="subtitle">Informasi lomba mahasiswa Universitas Andalas</p>
      </div>

      <div className="form-box">
        <h2>Daftar Lomba Terbaru</h2>
        {competitions.length === 0 ? (
          <p>Belum ada lomba yang tersedia.</p>
        ) : (
          <ul>
            {competitions.map((comp, index) => (
              <li key={index}>
                <h3>{comp.title}</h3>
                <p><strong>Penyelenggara:</strong> {comp.organizer}</p>
                <p><strong>Deadline:</strong> {comp.deadline}</p>
                <p>{comp.description}</p>
                <a href={comp.link} target="_blank" rel="noopener noreferrer">
                  📎 Link Pendaftaran
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PublicLombaPage;
