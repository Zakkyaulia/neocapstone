// In-memory storage untuk aspirasi
let aspirasiList = [];

// Get all aspirasi
export const getAllAspirasi = (req, res) => {
  try {
    res.json({
      success: true,
      data: aspirasiList,
      message: 'Berhasil mengambil semua aspirasi'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server',
      error: error.message
    });
  }
};

// Create new aspirasi
export const createAspirasi = (req, res) => {
  try {
    const { isi } = req.body;
    
    if (!isi || !isi.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Isi aspirasi tidak boleh kosong'
      });
    }

    const newAspirasi = {
      id: Date.now(),
      isi: isi.trim(),
      tanggal: new Date().toLocaleString('id-ID'),
      createdAt: new Date()
    };

    aspirasiList.push(newAspirasi);

    res.status(201).json({
      success: true,
      data: newAspirasi,
      message: 'Aspirasi berhasil ditambahkan'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server',
      error: error.message
    });
  }
};

// Delete aspirasi
export const deleteAspirasi = (req, res) => {
  try {
    const { id } = req.params;
    const aspirasiIndex = aspirasiList.findIndex(asp => asp.id === parseInt(id));
    
    if (aspirasiIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Aspirasi tidak ditemukan'
      });
    }

    const deletedAspirasi = aspirasiList.splice(aspirasiIndex, 1)[0];

    res.json({
      success: true,
      data: deletedAspirasi,
      message: 'Aspirasi berhasil dihapus'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server',
      error: error.message
    });
  }
}; 