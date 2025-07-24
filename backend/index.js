const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');

app.use(express.json()); // <= penting agar bisa menerima POST JSON

// Validasi API key
const apiKeyData = JSON.parse(fs.readFileSync('apikeys.json', 'utf-8'));
const validApiKey = apiKeyData.apikey;

// Middleware untuk akses halaman HTML dengan API key
app.get('/', (req, res) => {
  const userApiKey = req.query.apiKey;
  if (userApiKey !== validApiKey) {
    return res.status(403).send('<h1>403 Forbidden</h1><p>API Key salah atau tidak ada.</p>');
  }
  res.sendFile(path.join(__dirname, 'frontend', 'parameter.html'));
});

// Serve file statis dari folder public/
app.use(express.static(path.join(__dirname, 'frontend')));

// Variabel global penyimpan data sensor
let sensorData = {
  suhuudara: null,
  kelembabanudara: null,
  kelembabantanah: null,
  phtanah: null,
  intensitascahaya: null,
  level: null
};

// Endpoint GET untuk ambil data sensor
app.get('/api/data', (req, res) => {
  const key = req.query.apiKey;
  if (key !== validApiKey) {
    return res.status(403).json({ error: 'API Key salah' });
  }
  res.json(sensorData);
});

// Endpoint POST dari Insomnia
app.post('/api/sensor', (req, res) => {
  const { suhuudara, kelembabanudara, kelembabantanah, phtanah, intensitascahaya, level } = req.body;

  // Validasi sederhana
  if (!suhuudara || !kelembabanudara) {
    return res.status(400).json({ error: 'Data tidak lengkap' });
  }

  sensorData = { suhuudara, kelembabanudara, kelembabantanah, phtanah, intensitascahaya, level };
  console.log('📥 Data sensor diterima:', sensorData);
  res.json({ status: 'Data diterima' });
});

app.listen(port, () => {
  console.log(`✅ Server berjalan di http://localhost:${port}`);
});
