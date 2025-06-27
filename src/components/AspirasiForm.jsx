import React, { useState } from "react";
import "../styles/AspirasiForm.css";

function AspirasiForm({ onSubmit }) {
  const [aspirasi, setAspirasi] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!aspirasi.trim()) return;

    const newAspirasi = {
      id: Date.now(),
      isi: aspirasi,
      tanggal: new Date().toLocaleString(),
    };

    onSubmit(newAspirasi);
    setAspirasi("");
  };

  return (
    <div className="aspirasi-form-container">
      <h2>Kirim Aspirasi atau Saran</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Tulis aspirasi atau saran kamu di sini..."
          value={aspirasi}
          onChange={(e) => setAspirasi(e.target.value)}
          rows="4"
          required
        ></textarea>
        <button type="submit">Kirim</button>
      </form>
    </div>
  );
}

export default AspirasiForm;
