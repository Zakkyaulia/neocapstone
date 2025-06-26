import React, { useState } from "react";

export default function AddCompetitionForm() {
  const [judul, setJudul] = useState("");
  const [penyelenggara, setPenyelenggara] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLomba = { judul, penyelenggara, tanggal, link };

    const oldData = JSON.parse(localStorage.getItem("competitions")) || [];
    const newData = [...oldData, newLomba];

    localStorage.setItem("competitions", JSON.stringify(newData));
    setJudul(""); setPenyelenggara(""); setTanggal(""); setLink("");
    alert("✅ Lomba berhasil ditambahkan!");
  };

  return (
    <div>
      <h3>Tambah Lomba</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Judul Lomba" value={judul} onChange={(e) => setJudul(e.target.value)} required />
        <input type="text" placeholder="Penyelenggara" value={penyelenggara} onChange={(e) => setPenyelenggara(e.target.value)} required />
        <input type="date" value={tanggal} onChange={(e) => setTanggal(e.target.value)} required />
        <input type="url" placeholder="Link Pendaftaran" value={link} onChange={(e) => setLink(e.target.value)} required />
        <button type="submit">Tambah</button>
      </form>
    </div>
  );
}
