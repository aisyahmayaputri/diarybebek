export function initEntryEditor() {
    const homeView = document.getElementById('home-view');
    const editorView = document.getElementById('editor-view');
    
    // Elemen Header Editor
    const btnBack = document.getElementById('btn-back-home');
    const btnSave = document.getElementById('btn-save-entry');
    
    // Area Konten Utama
    const contentArea = document.getElementById('editor-content-area');
    
    // Elemen Toolbar
    const mainToolbar = document.getElementById('main-toolbar');
    const drawToolbar = document.getElementById('draw-toolbar');
    const btnToggleDraw = document.getElementById('btn-toggle-draw');
    const btnExitDraw = document.getElementById('btn-exit-draw');

    // 1. Fungsi Membuka Editor (Dipanggil dari create-menu.js)
    window.openEditor = function() {
        homeView.classList.remove('active');
        editorView.classList.add('active');
        
        // PENTING: Cegah keyboard terbuka otomatis (Sesuai Aturan DO NOT)
        document.getElementById('text-layer').blur(); 
        
        // Panggil fungsi resizeCanvas yang ada di canvas-draw.js
        // Diberi delay 300ms agar DOM selesai dirender dan transisi halaman selesai
        setTimeout(() => {
            if (window.resizeCanvas) window.resizeCanvas();
        }, 300);
    };

    // 2. Fungsi Menutup Editor & Kembali ke Home
    const closeEditor = () => {
        editorView.classList.remove('active');
        homeView.classList.add('active');
        setDrawMode(false); // Reset kembali ke mode teks saat keluar
    };

    // Event Listener Header
    if (btnBack) btnBack.addEventListener('click', closeEditor);
    if (btnSave) btnSave.addEventListener('click', () => {
        console.log("Menyimpan entri ke dalam sistem...");
        closeEditor();
    });

    // 3. Fungsi Pertukaran Mode (Teks ↔ Coret)
    const setDrawMode = (isActive) => {
        if (isActive) {
            // AKTIFKAN MODE CORET
            contentArea.classList.add('draw-mode-active');
            
            // Sembunyikan toolbar utama, tampilkan toolbar menggambar
            mainToolbar.classList.remove('active-toolbar');
            mainToolbar.classList.add('hidden-toolbar');
            drawToolbar.classList.remove('hidden-toolbar');
            drawToolbar.classList.add('active-toolbar');
            
            // Paksa keyboard menutup jika pengguna sedang mengetik
            document.activeElement.blur(); 
        } else {
            // KEMBALI KE MODE TEKS
            contentArea.classList.remove('draw-mode-active');
            
            // Sembunyikan toolbar menggambar, tampilkan toolbar utama
            drawToolbar.classList.remove('active-toolbar');
            drawToolbar.classList.add('hidden-toolbar');
            mainToolbar.classList.remove('hidden-toolbar');
            mainToolbar.classList.add('active-toolbar');
        }
    };

    // Event Listener Tombol Toolbar
    if (btnToggleDraw) btnToggleDraw.addEventListener('click', () => setDrawMode(true));
    if (btnExitDraw) btnExitDraw.addEventListener('click', () => setDrawMode(false));
}
