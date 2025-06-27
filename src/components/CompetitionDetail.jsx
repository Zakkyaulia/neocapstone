// src/components/CompetitionDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function CompetitionDetail() {
  const { id } = useParams(); // ambil id dari URL
  const navigate = useNavigate();
  const [competition, setCompetition] = useState(null);

  useEffect(() => {
    const storedCompetitions = JSON.parse(localStorage.getItem("competitions")) || [];
    const selected = storedCompetitions.find((_, index) => index === parseInt(id));
    setCompetition(selected);
  }, [id]);

  if (!competition) {
    return (
      <div className="page-container">
        <div className="form-box">
          <p>Lomba tidak ditemukan.</p>
          <button onClick={() => navigate(-1)}>⬅️ Kembali</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="info-box">
        <img src="/logo-unand.png" alt="Logo UNAND" className="logo-unand" />
        <div className="web-title">Detail Lomba</div>
        <div className="subtitle">Informasi lengkap lomba</div>
      </div>

      <div className="form-box">
        <h2>{competition.title}</h2>
        <p><strong>Penyelenggara:</strong> {competition.org}</p>
        <p><strong>Deadline:</strong> {competition.deadline}</p>
        <p>{competition.description}</p>
        {competition.link && (
          <p>
            <a href={competition.link} target="_blank" rel="noopener noreferrer">
              🔗 Link Pendaftaran
            </a>
          </p>
        )}
        <button onClick={() => navigate(-1)} style={{ marginTop: "1rem" }}>
          ⬅️ Kembali
        </button>
      </div>
    </div>
  );
}

export default CompetitionDetail;
