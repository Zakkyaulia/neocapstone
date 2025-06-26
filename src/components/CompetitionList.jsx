import { useEffect, useState } from "react";

export default function CompetitionList() {
  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("competitions")) || [];
    setCompetitions(stored);
  }, []);

  return (
    <div className="form-box">
      <h2>Daftar Lomba</h2>
      {competitions.length === 0 ? (
        <p style={{ textAlign: "center" }}>Belum ada lomba yang tersedia.</p>
      ) : (
        <ul className="competition-list">
          {competitions.map((comp, index) => (
            <li key={index} className="competition-item">
              <h3>{comp.title}</h3>
              <p><strong>Penyelenggara:</strong> {comp.organizer}</p>
              <p><strong>Tanggal:</strong> {comp.date}</p>
              <a href={comp.link} target="_blank" rel="noopener noreferrer">🔗 Daftar</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
