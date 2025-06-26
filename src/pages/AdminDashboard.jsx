import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [lombaList, setLombaList] = useState([]);
  const [newLomba, setNewLomba] = useState({
    nama: "",
    penyelenggara: "",
    tanggal: "",
    deskripsi: ""
  });

  // Cek otorisasi admin
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser || storedUser.role !== "admin") {
      navigate("/login");
    }
  }, [navigate]);

  // Ambil data lomba dari localStorage saat pertama kali load
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("lombaList")) || [];
    setLombaList(data);
  }, []);

  // Tangani perubahan input form
  const handleChange = (e) => {
    setNewLomba({
      ...newLomba,
      [e.target.name]: e.target.value
    });
  };

  // Tambah lomba baru
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedList = [
      ...lombaList,
      { ...newLomba, id: Date.now() }
    ];
    setLombaList(updatedList);
    localStorage.setItem("lombaList", JSON.stringify(updatedList));
    setNewLomba({ nama: "", penyelenggara: "", tanggal: "", deskripsi: "" });
  };

  // Hapus lomba
  const handleDelete = (id) => {
    const updatedList = lombaList.filter((item) => item.id !== id);
    setLombaList(updatedList);
    localStorage.setItem("lombaList", JSON.stringify(updatedList));
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="page-container">
      {/* Kotak Info */}
      <div className="info-box">
        <img src="/logo-unand.png" alt="Logo UNAND" className="logo-unand" />
        <h1 className="web-title">Admin UNAND</h1>
        <p className="subtitle">Dashboard Pengelolaan Informasi Lomba</p>
      </div>

      {/* Form Tambah Lomba */}
      <div className="form-box">
        <h3>Tambah Lomba</h3>
        <form onSubmit={handleSubmit}>
          <input
            name="nama"
            placeholder="Nama Lomba"
            value={newLomba.nama}
            onChange={handleChange}
            required
          />
          <input
            name="penyelenggara"
            placeholder="Penyelenggara"
            value={newLomba.penyelenggara}
            onChange={handleChange}
            required
          />
          <input
            name="tanggal"
            type="date"
            value={newLomba.tanggal}
            onChange={handleChange}
            required
          />
          <textarea
            name="deskripsi"
            placeholder="Deskripsi Lomba"
            value={newLomba.deskripsi}
            onChange={handleChange}
            required
          />
          <button type="submit">Tambah</button>
        </form>
      </div>

      {/* Daftar Lomba */}
      <div className="form-box">
        <h3>Daftar Lomba</h3>
        {lombaList.length === 0 ? (
          <p>Belum ada lomba.</p>
        ) : (
          <ul>
            {lombaList.map((lomba) => (
              <li key={lomba.id}>
                <strong>{lomba.nama}</strong> oleh {lomba.penyelenggara}<br />
                <small>{lomba.tanggal}</small><br />
                <em>{lomba.deskripsi}</em><br />
                <button onClick={() => handleDelete(lomba.id)}>Hapus</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Logout */}
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
}
