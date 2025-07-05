const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const validKeys = JSON.parse(fs.readFileSync('apikeys.json')).keys;
const path = require('path');
const apiKeyData = JSON.parse(fs.readFileSync('apikeys.json', 'utf-8'));
const validApiKey = apiKeyData.apikey;

// Serve file statis dari folder "public"
app.use((req, res, next) => {
  const userApiKey = req.query.apikey;
  const isApiRequest = req.path.startsWith('/api');

  if (isApiRequest || req.path === '/favicon.ico') {
    return next(); // Boleh lanjut untuk endpoint API
  }

  if (userApiKey !== validApiKey) {
    return res.status(403).send('<h1>403 Forbidden</h1><p>API Key salah atau tidak ada.</p>');
  }

  next();
});

app.use(express.static(path.join(__dirname, 'public')));

let sensorData = {
  suhuudara: null,
  kelembabanudara: null,
  kelembabantanah: null,
  phtanah: null,
  intensitascahaya: null,
  level: null
};

app.get('/cek', (req, res) => {
  res.send('Server hidup dan endpoint OK!');
});

app.post('/api/sensor', (req, res) => {
  const { suhuudara, kelembabanudara, kelembabantanah, phtanah, intensitascahaya, level} = req.body;
  sensorData = { suhuudara, kelembabanudara, kelembabantanah, phtanah, intensitascahaya, level };
  console.log("Data sensor diterima:", sensorData);
  res.json({ status: 'Data diterima' });
});


app.get('/api/sensor', (req, res) => {
  res.json(sensorData);
});

app.listen(port, () => {
  console.log(`✅ Server berjalan di http://localhost:${port}`);
});

fetch('http://localhost:3000/api/data?apiKey=12345')
  .then(res => res.json())
  .then(data => console.log(data));

