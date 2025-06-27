import express from 'express';
import {
  getAllAspirasi,
  createAspirasi,
  deleteAspirasi
} from '../controller/aspirasiController.js';

const router = express.Router();

// GET /api/aspirasi - Get all aspirasi
router.get('/', getAllAspirasi);

// POST /api/aspirasi - Create new aspirasi
router.post('/', createAspirasi);

// DELETE /api/aspirasi/:id - Delete aspirasi
router.delete('/:id', deleteAspirasi);

export default router; 