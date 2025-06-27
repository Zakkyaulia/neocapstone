import React, { useState, useEffect } from "react";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [lombaList, setLombaList] = useState([]);
  const [judul, setJudul] = useState("");
  const [penyelenggara, setPenyelenggara] = useState("");
  const [deadline, setDeadline] = useState("");
  const [link, setLink] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const storedLomba = JSON.parse(localStorage.getItem("lombaList")) || [];
    setLombaList(storedLomba);
  }, []);

  const handleTambahLomba = (e) => {
    e.preventDefault();
    if (!judul || !penyelenggara || !deadline || !link || !deskripsi) return;

    const newLomba = {
      id: Date.now(),
      judul,
      penyelenggara,
      deadline,
      link,
      deskripsi,
    };

    const updatedLomba = [...lombaList, newLomba];
    setLombaList(updatedLomba);
    localStorage.setItem("lombaList", JSON.stringify(updatedLomba));

    setJudul("");
    setPenyelenggara("");
    setDeadline("");
    setLink("");
    setDeskripsi("");
    setSuccessMsg("✅ Lomba berhasil ditambahkan!");
    setTimeout(() => setSuccessMsg(""), 2000);
  };

  const handleHapus = (id) => {
    const filtered = lombaList.filter((item) => item.id !== id);
    setLombaList(filtered);
    localStorage.setItem("lombaList", JSON.stringify(filtered));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="page-container">
      <div className="info-box">
        <img src="/logo-unand.png" alt="Logo UNAND" className="logo-unand" />
        <h1 className="web-title">Dashboard Admin</h1>
        <p className="subtitle">Kelola data lomba mahasiswa Universitas Andalas</p>
      </div>

      <div className="form-box">
        <h2 className="form-title">Tambah Lomba</h2>
        {successMsg && <div className="success-msg">{successMsg}</div>}

        <form onSubmit={handleTambahLomba}>
          <input
            type="text"
            placeholder="Judul Lomba"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Penyelenggara"
            value={penyelenggara}
            onChange={(e) => setPenyelenggara(e.target.value)}
            required
          />
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
          <input
            type="url"
            placeholder="Link Pendaftaran"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
          />
          <textarea
            placeholder="Deskripsi Lomba"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            required
          ></textarea>
          <button type="submit" className="submit-btn">Tambah</button>
        </form>
      </div>

      <div className="form-box">
        <h2 className="form-title">Daftar Lomba</h2>
        {lombaList.length === 0 ? (
          <p>Belum ada lomba yang ditambahkan.</p>
        ) : (
          <ul>
            {lombaList.map((lomba) => (
              <li key={lomba.id}>
                <h3>{lomba.judul}</h3>
                <p><strong>Penyelenggara:</strong> {lomba.penyelenggara}</p>
                <p><strong>Deadline:</strong> {lomba.deadline}</p>
                <p><strong>Link:</strong> <a href={lomba.link} target="_blank" rel="noreferrer">{lomba.link}</a></p>
                <p>{lomba.deskripsi}</p>
                <button onClick={() => handleHapus(lomba.id)}>Hapus</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AdminDashboard;
