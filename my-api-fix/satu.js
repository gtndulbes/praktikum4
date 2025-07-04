document.addEventListener("DOMContentLoaded", function()  { 
//penggabung script login dan sensor

function getRandom(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

function updateSensorData() {
    document.getElementById('suhu').textContent = getRandom(20, 35) + ' °C';
    document.getElementById('ph').textContent = getRandom(5.5, 7.5);
    document.getElementById('kelembaban').textContent = getRandom(40, 90) + ' %';
}

// Update tiap 2 detik
setInterval(updateSensorData, 2000);

// Update pertama kali
updateSensorData();
});

document.addEventListener("DOMContentLoaded", function()  {
// data pengguna
const users = [
    { username: "admin", password: "12345" },
    { username: "user", password: "password" }
];

document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const uname = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    const error = document.getElementById("error");

    const found = users.find(user => user.username === uname && user.password === pass);
    if (found) {
    // Simpan status login ke localStorage
    localStorage.setItem("isLoggedIn", "true");
    // Redirect ke dashboard
    window.location.href = "dashboard.html";
    } else {
    error.textContent = "Username atau password salah!";
    }
});
});

// Kontrol Perangkat
function toggleac () {
    const btn = document.getElementById(`ac`);
    const isOn = btn.textContent.includes('ON');

    if (isOn) {
    btn.textContent = `A/C OFF`;
    btn.classList.remove('on');
    addLog(`A/C dimatikan`);
    } else {
    btn.textContent = `A/C ON`;
    btn.classList.add('on');
    addLog(`A/C dinyalakan`);
    }
}

function togglehumidity() {
    const btn = document.getElementById(`humidity`);
    const isOn = btn.textContent.includes('ON');

    if (isOn) {
    btn.textContent = `HUMIDIFIER OFF`;
    btn.classList.remove('on');
    addLog(`Humidifier dimatikan`);
    } else {
    btn.textContent = `HUMIDIFIER ON`;
    btn.classList.add('on');
    addLog(`Humidifier dinyalakan`);
    }
}
function togglePump() {
    const btn = document.getElementById('pump');
    const isOn = btn.textContent.includes('ON');

    if (isOn) {
    btn.textContent = 'POMPA OFF';
    btn.classList.remove('on');
    addLog('Pompa dimatikan');
    } else {
    btn.textContent = 'POMPA ON';
    btn.classList.add('on');
    addLog('Pompa dinyalakan');
    }
}

// Log Aktivitas
function addLog(message) {
    const logElement = document.getElementById('activity-log');
    const timestamp = new Date().toLocaleTimeString();
    logElement.innerHTML = `<p>[${timestamp}] ${message}</p>` + logElement.innerHTML;
}

// Inisialisasi
// Panggil fungsi ini jika ingin memuat sensor data awal
// updateSensorData(); // pastikan fungsi ini didefinisikan jika digunakan
addLog('Sistem IoT berjalan!');
