// src/components/CompetitionList.jsx
import React, { useEffect, useState } from "react";
import "./UserDashboard.css";
import "./CompetitionList.css";

function CompetitionList() {
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("competitions")) || [];
    setCompetitions(stored);
  }, []);

  return (
    <div className="page-container">
      <div className="info-box">
        <img src="/logo-unand.png" alt="Logo UNAND" className="logo-unand" />
        <div className="web-title">UNAND Competition Hub</div>
        <div className="subtitle">Informasi Lomba Mahasiswa</div>
      </div>

      <div className="form-box">
        <h2>Daftar Lomba Terkini</h2>

        {competitions.length === 0 ? (
          <p>Belum ada lomba yang tersedia saat ini.</p>
        ) : (
          <ul>
            {competitions.map((comp, index) => (
              <li key={index}>
                <h3>{comp.title}</h3>
                <p><strong>Penyelenggara:</strong> {comp.org}</p>
                <p><strong>Deadline:</strong> {comp.deadline}</p>
                <p>{comp.description}</p>
                {comp.link && (
                  <a href={comp.link} target="_blank" rel="noopener noreferrer">
                    🔗 Link Pendaftaran
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CompetitionList;
