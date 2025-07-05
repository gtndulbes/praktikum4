const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

const validKeys = JSON.parse(fs.readFileSync('/apikeys.json')).keys;

app.use((req, res, next) => {
    const apiKey = req.query.apiKey || req.headers['x-api-key'];
    if (!validKeys.includes(apiKey)) {
        return res.status(401).json({ message: 'Unauthorized: Invalid API key' });
    }
    next();
});

app.get('/api/data', (req, res) => {
    res.json({ data: 'Ini data rahasia hanya untuk pemilik API key' });
});

app.listen(3000, () => console.log('Server running on port 3000'));

app.use(express.json());
app.use(express.static('public'));

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
