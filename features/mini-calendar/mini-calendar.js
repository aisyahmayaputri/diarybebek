let currentDate = new Date();

// Contoh data dummy untuk Event (warna adjustable) dan Mood (emoji)
const dummyData = {
    // Kunci: 'YYYY-M-D' (tanpa nol di depan agar mudah dicocokkan)
    '2026-10-18': { mood: '😊', events: ['#FF6B6B', '#4ECDC4'] }, // Event haid (merah), rencana (teal)
    '2026-10-12': { mood: '😴', events: [] },
    '2026-10-25': { mood: '', events: ['#FFD93D'] } // Event ulang tahun (kuning)
};

export function initMiniCalendar() {
    renderCalendar();

    // Event listeners untuk navigasi bulan
    document.getElementById('prev-month')?.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    document.getElementById('next-month')?.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });
}

function renderCalendar() {
    const title = document.getElementById('calendar-month-year');
    const daysContainer = document.getElementById('calendar-days');
    
    if (!title || !daysContainer) return;

    daysContainer.innerHTML = ''; // Bersihkan isi lama

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Set judul bulan & tahun (misal: "Oktober 2026")
    const options = { month: 'long', year: 'numeric' };
    title.textContent = currentDate.toLocaleDateString('id-ID', options);

    // Tanggal 1 ada di hari apa? (0 = Minggu, 6 = Sabtu)
    const firstDayIndex = new Date(year, month, 1).getDay();
    // Jumlah hari di bulan saat ini
    const lastDay = new Date(year, month + 1, 0).getDate();
    // Jumlah hari di bulan sebelumnya
    const prevLastDay = new Date(year, month, 0).getDate();

    // Render tanggal bulan sebelumnya (pengisi kekosongan di awal)
    for (let x = firstDayIndex; x > 0; x--) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'calendar-day other-month';
        dayDiv.textContent = prevLastDay - x + 1;
        daysContainer.appendChild(dayDiv);
    }

    // Render tanggal bulan saat ini
    const today = new Date();
    for (let i = 1; i <= lastDay; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'calendar-day bounce-hover';
        dayDiv.textContent = i;

        // Cek apakah ini hari ini
        if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            dayDiv.classList.add('today');
        }

        // --- Sisipkan Indikator Mood / Event dari Dummy Data ---
        const dateKey = `${year}-${month + 1}-${i}`;
        const dayData = dummyData[dateKey];

        if (dayData) {
            const indicatorsDiv = document.createElement('div');
            indicatorsDiv.className = 'day-indicators';

            // Jika ada event, tampilkan dot warna
            if (dayData.events && dayData.events.length > 0) {
                dayData.events.forEach(color => {
                    const dot = document.createElement('div');
                    dot.className = 'event-dot';
                    dot.style.backgroundColor = color;
                    indicatorsDiv.appendChild(dot);
                });
            }

            // Jika ada mood, tampilkan kecil saja (opsional, sebagai pengganti / pelengkap dot)
            if (dayData.mood) {
                // Untuk kesederhanaan, mood bisa ditampilkan sebagai konten kecil atau tooltip
                // Di sini kita buat title atribut agar jika dihover/diklik (desktop/mobile) muncul info
                dayDiv.title = `Mood: ${dayData.mood}`; 
            }

            dayDiv.appendChild(indicatorsDiv);
        }

        // Interaksi saat tanggal diklik (memunculkan keterangan kecil event seperti cetak biru D.5)
        dayDiv.addEventListener('click', () => {
            console.log(`Tanggal diklik: ${i} ${title.textContent}`);
            // Nantinya di sini kita panggil fungsi untuk memunculkan pop-up kecil keterangan event
        });

        daysContainer.appendChild(dayDiv);
    }

    // Hitung sisa kotak grid untuk bulan berikutnya agar pas 7 kolom (maksimal 42 kotak total)
    const totalBoxesRendered = firstDayIndex + lastDay;
    const remainingBoxes = 42 - totalBoxesRendered; // 6 baris x 7 hari

    // Render tanggal bulan depan
    for (let j = 1; j <= remainingBoxes; j++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'calendar-day other-month';
        dayDiv.textContent = j;
        daysContainer.appendChild(dayDiv);
    }
}
