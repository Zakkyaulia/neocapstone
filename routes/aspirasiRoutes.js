const express = require('express');
const router = express.Router();
const { 
  createAspirasi, 
  getAllAspirasi, 
  getAspirasiByUserId, 
  getAspirasiById 
} = require('../controllers/aspirasiController');

// Route untuk membuat aspirasi baru (user)
router.post('/create', createAspirasi);

// Route untuk mendapatkan semua aspirasi (admin)
router.get('/all', getAllAspirasi);

// Route untuk mendapatkan aspirasi berdasarkan user_id
router.get('/user/:user_id', getAspirasiByUserId);

// Route untuk mendapatkan aspirasi berdasarkan ID
router.get('/:id', getAspirasiById);

module.exports = router; 