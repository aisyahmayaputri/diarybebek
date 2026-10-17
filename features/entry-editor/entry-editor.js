export function initEntryEditor() {
    const homeView = document.getElementById('home-view');
    const editorView = document.getElementById('editor-view');
    const btnBack = document.getElementById('btn-back-home');
    const btnSave = document.getElementById('btn-save-entry');
    
    // Elemen Editor
    const contentArea = document.getElementById('editor-content-area');
    const btnToggleDraw = document.getElementById('btn-toggle-draw');

    // 1. Fungsi Navigasi (Dipanggil dari create-menu.js nanti)
    window.openEditor = function() {
        homeView.classList.remove('active');
        editorView.classList.add('active');
        
        // PENTING (Aturan F): Teks area di-blur agar keyboard TIDAK terbuka otomatis
        document.getElementById('text-layer').blur(); 
    };

    // Kembali ke Home
    const closeEditor = () => {
        editorView.classList.remove('active');
        homeView.classList.add('active');
    };

    if (btnBack) btnBack.addEventListener('click', closeEditor);
    if (btnSave) btnSave.addEventListener('click', () => {
        console.log("Menyimpan entri...");
        closeEditor();
    });

    // 2. Logika Toggle Mode Teks vs Mode Coret
    let isDrawMode = false;

    if (btnToggleDraw) {
        btnToggleDraw.addEventListener('click', () => {
            isDrawMode = !isDrawMode;
            
            if (isDrawMode) {
                // Aktifkan Mode Coret
                contentArea.classList.add('draw-mode-active');
                btnToggleDraw.classList.add('active');
                btnToggleDraw.textContent = "✍️ Kembali ke Teks";
                
                // Pastikan keyboard turun jika sedang terbuka
                document.activeElement.blur(); 
            } else {
                // Aktifkan Mode Teks
                contentArea.classList.remove('draw-mode-active');
                btnToggleDraw.classList.remove('active');
                btnToggleDraw.textContent = "🖍️ Mode Coret";
            }
        });
    }

    // 3. Setup awal Canvas (Hanya menyiapkan ukuran kanvas agar tidak pecah)
    const canvas = document.getElementById('draw-layer');
    if (canvas) {
        // Sesuaikan ukuran kanvas dengan ukuran pembungkusnya
        const resizeCanvas = () => {
            canvas.width = contentArea.clientWidth;
            canvas.height = contentArea.clientHeight;
        };
        // Panggil saat editor dibuka/di-resize
        window.addEventListener('resize', resizeCanvas);
        // Timeout sedikit untuk memastikan DOM sudah dirender penuh
        setTimeout(resizeCanvas, 100); 
    }
}
