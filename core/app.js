// Mengimpor fungsi dari berbagai modul terpisah
import { initHome } from '../features/home/home.js';
import { initCreateMenu } from '../features/create-menu/create-menu.js';
import { initMoodWidget } from '../features/mood-widget/mood-widget.js';
import { initMiniCalendar } from '../features/mini-calendar/mini-calendar.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inisialisasi logika Halaman Home (Tanggal & Sapaan)
    initHome();

    // 2. Inisialisasi widget Mood
    initMoodWidget();
    initMiniCalendar(); // Inisialisasi kalender
    // 3. Inisialisasi logika Menu Buat Baru (Tombol Plus)
    initCreateMenu();
});
