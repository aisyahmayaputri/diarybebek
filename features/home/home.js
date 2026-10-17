// Data statis sementara (Nanti bisa diambil dari database/akun pengguna)
const userData = {
    username: "@maiosamu",
    displayName: "Mai"
};

// Array sapaan variatif
const greetings = {
    pagi: ["Selamat pagi,", "Awal hari yang indah,", "Siap untuk hari ini,"],
    siang: ["Selamat siang,", "Tetap semangat,", "Waktunya istirahat sejenak,"],
    sore: ["Selamat sore,", "Hari yang menyenangkan,", "Santai sejenak,"],
    malam: ["Selamat malam,", "Waktunya beristirahat,", "Hari yang panjang telah usai,"]
};

// Fungsi untuk mendapatkan sapaan berdasarkan waktu
function getDynamicGreeting() {
    const hour = new Date().getHours();
    let timeOfDay = "malam";

    if (hour >= 5 && hour < 11) timeOfDay = "pagi";
    else if (hour >= 11 && hour < 15) timeOfDay = "siang";
    else if (hour >= 15 && hour < 18) timeOfDay = "sore";

    // Pilih sapaan acak dari array berdasarkan waktu
    const randomGreetings = greetings[timeOfDay];
    const selectedGreeting = randomGreetings[Math.floor(Math.random() * randomGreetings.length)];
    
    return `${selectedGreeting} ${userData.displayName}.`;
}

// Fungsi untuk format tanggal (Contoh: Minggu, 18 Oktober 2026)
function getCurrentFormattedDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('id-ID', options);
}

// Fungsi ekspor yang akan dipanggil oleh core
export function initHome() {
    const greetingElement = document.getElementById('daily-greeting');
    const dateElement = document.getElementById('current-date');

    if (greetingElement && dateElement) {
        greetingElement.textContent = getDynamicGreeting();
        dateElement.textContent = getCurrentFormattedDate();
    }
}
