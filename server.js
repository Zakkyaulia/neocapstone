const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./models');
const authRoutes = require('./routes/authRoutes');
const aspirasiRoutes = require('./routes/aspirasiRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/aspirasi', aspirasiRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Server berjalan dengan baik!' });
});

// Sync database dan jalankan server
db.sequelize.sync()
  .then(() => {
    console.log('Database berhasil tersinkronisasi');
    app.listen(PORT, () => {
      console.log(`Server berjalan di port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error sinkronisasi database:', error);
  }); 