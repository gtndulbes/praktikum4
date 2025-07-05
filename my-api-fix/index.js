const express = require('express');
const app = express();
const port = 3000;

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
