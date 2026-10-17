// Mengimpor fungsi dari modul Home
import { initHome } from '../features/home/home.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inisialisasi halaman Home
    initHome();

    // 2. Setup Tombol Plus (Sementara hanya console log untuk tes)
    const btnAdd = document.getElementById('btn-add-new');
    if (btnAdd) {
        btnAdd.addEventListener('click', () => {
            console.log("Menu Opsi Entri/Folder/Tag Baru Akan Terbuka Disini");
            // Catatan: Tidak ada kode fokus ke keyboard di sini sesuai aturan DO NOT!
        });
    }

    // (Contoh untuk nanti: Logika mengganti tema bisa dipanggil dari sini)
    // document.documentElement.setAttribute('data-theme', 'autumn');
});
