const db = require('../models');
const User = db.user;

// Register controller (hanya untuk user)
const register = async (req, res) => {
  try {
    const { nama, email, password } = req.body;
    
    // Validasi input
    if (!nama || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Nama, email, dan password harus diisi'
      });
    }

    // Validasi email format - hanya perlu ada @
    if (!email.includes('@')) {
      return res.status(400).json({
        success: false,
        message: 'Email harus mengandung karakter @'
      });
    }

    // Validasi password minimal 6 karakter
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password minimal 6 karakter'
      });
    }

    // Cek apakah email sudah terdaftar
    const existingUser = await User.findOne({
      where: { email: email.trim().toLowerCase() }
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email sudah terdaftar'
      });
    }

    // Buat user baru (role default: user)
    const newUser = await User.create({
      nama: nama.trim(),
      email: email.trim().toLowerCase(),
      password: password.trim(),
      role: 'user' // Hanya user, bukan admin
    });

    // Response tanpa password
    const userData = {
      id: newUser.id,
      nama: newUser.nama,
      email: newUser.email,
      role: newUser.role
    };

    res.status(201).json({
      success: true,
      message: 'Registrasi berhasil',
      data: userData
    });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server',
      error: error.message
    });
  }
};

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
  register,
  login
}; 