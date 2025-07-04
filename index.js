const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

let sensorData = {
  suhu: null,
  kelembaban: null,
  kecepatan: null
};

app.get('/cek', (req, res) => {
  res.send('Server hidup dan endpoint OK!');
});

app.post('/api/sensor', (req, res) => {
  const { suhu, kelembaban, kecepatan } = req.body;
  sensorData = { suhu, kelembaban, kecepatan };
  console.log("Data sensor diterima:", sensorData);
  res.json({ status: 'Data diterima' });
});


app.get('/api/sensor', (req, res) => {
  res.json(sensorData);
});

app.listen(port, () => {
  console.log(`✅ Server berjalan di http://localhost:${port}`);
});
