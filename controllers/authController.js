const db = require('../models');
const User = db.user;

// Login controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validasi input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email dan password harus diisi'
      });
    }

    // Cari user berdasarkan email
    const user = await User.findOne({
      where: { email: email.trim().toLowerCase() }
    });

    // Jika user tidak ditemukan
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Email atau password salah'
      });
    }

    // Cek password (plain text comparison)
    if (user.password !== password.trim()) {
      return res.status(401).json({
        success: false,
        message: 'Email atau password salah'
      });
    }

    // Login berhasil
    const userData = {
      id: user.id,
      nama: user.nama,
      email: user.email,
      role: user.role
    };

    res.json({
      success: true,
      message: 'Login berhasil',
      data: userData
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server',
      error: error.message
    });
  }
};

module.exports = {
  login
}; 