const db = require('../models');
const Aspirasi = db.aspirasi;
const User = db.user;

// Membuat aspirasi baru
const createAspirasi = async (req, res) => {
  try {
    const { user_id, laporan } = req.body;
    
    // Validasi input
    if (!user_id || !laporan) {
      return res.status(400).json({
        success: false,
        message: 'user_id dan laporan harus diisi'
      });
    }

    // Cek apakah user exists
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User tidak ditemukan'
      });
    }

    // Buat aspirasi baru
    const aspirasi = await Aspirasi.create({
      user_id,
      laporan
    });

    res.status(201).json({
      success: true,
      message: 'Aspirasi berhasil dibuat',
      data: aspirasi
    });

  } catch (error) {
    console.error('Create aspirasi error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server',
      error: error.message
    });
  }
};

// Mendapatkan semua aspirasi (untuk admin)
const getAllAspirasi = async (req, res) => {
  try {
    const aspirasi = await Aspirasi.findAll({
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'nama', 'email']
      }],
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      message: 'Data aspirasi berhasil diambil',
      data: aspirasi
    });

  } catch (error) {
    console.error('Get all aspirasi error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server',
      error: error.message
    });
  }
};

// Mendapatkan aspirasi berdasarkan user_id
const getAspirasiByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    
    const aspirasi = await Aspirasi.findAll({
      where: { user_id },
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      message: 'Data aspirasi user berhasil diambil',
      data: aspirasi
    });

  } catch (error) {
    console.error('Get aspirasi by user error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server',
      error: error.message
    });
  }
};

// Mendapatkan aspirasi berdasarkan ID
const getAspirasiById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const aspirasi = await Aspirasi.findByPk(id, {
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'nama', 'email']
      }]
    });

    if (!aspirasi) {
      return res.status(404).json({
        success: false,
        message: 'Aspirasi tidak ditemukan'
      });
    }

    res.json({
      success: true,
      message: 'Data aspirasi berhasil diambil',
      data: aspirasi
    });

  } catch (error) {
    console.error('Get aspirasi by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server',
      error: error.message
    });
  }
};

module.exports = {
  createAspirasi,
  getAllAspirasi,
  getAspirasiByUserId,
  getAspirasiById
}; 