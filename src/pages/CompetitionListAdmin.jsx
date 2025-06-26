import React, { useEffect, useState } from "react";

export default function CompetitionListAdmin() {
  const [lomba, setLomba] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("competitions")) || [];
    setLomba(data);
  }, []);

  const handleDelete = (index) => {
    const newData = [...lomba];
    newData.splice(index, 1);
    localStorage.setItem("competitions", JSON.stringify(newData));
    setLomba(newData);
  };

  return (
    <div>
      <h3>Daftar Lomba</h3>
      {lomba.length === 0 ? (
        <p>Belum ada lomba ditambahkan.</p>
      ) : (
        <ul>
          {lomba.map((item, i) => (
            <li key={i}>
              <strong>{item.judul}</strong> - {item.penyelenggara}<br />
              Tanggal: {item.tanggal}<br />
              <a href={item.link} target="_blank" rel="noopener noreferrer">Link</a><br />
              <button onClick={() => handleDelete(i)}>Hapus</button>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
