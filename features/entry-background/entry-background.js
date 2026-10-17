export function initEntryBackground() {
    // Elemen Trigger
    const btnThemeBg = document.getElementById('btn-theme-bg');
    
    // Elemen Menu Overlay
    const overlay = document.getElementById('bg-menu-overlay');
    const menu = document.getElementById('bg-menu');
    
    // Elemen Target (Yang warnanya/motifnya akan diubah)
    const editorContentArea = document.getElementById('editor-content-area');
    
    // Elemen Pilihan dalam Menu
    const patternBtns = document.querySelectorAll('.bg-pattern-btn');
    const colorPicker = document.getElementById('bg-color-picker');

    // 1. Fungsi Buka/Tutup Menu
    const openMenu = () => {
        overlay.classList.remove('hidden');
        menu.classList.remove('hidden');
        document.activeElement.blur(); // Pastikan keyboard tertutup
    };

    const closeMenu = () => {
        overlay.classList.add('hidden');
        menu.classList.add('hidden');
    };

    if (btnThemeBg) btnThemeBg.addEventListener('click', openMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);

    // 2. Fungsi Mengubah Motif (Dots, Grid, Polos)
    patternBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const pattern = e.currentTarget.dataset.pattern;
            
            // Ubah UI tombol yang aktif
            patternBtns.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            
            // Terapkan motif ke area konten (terhubung ke CSS yang sudah dibuat di entry-editor.css)
            editorContentArea.setAttribute('data-entry-bg', pattern);
            
            // Catatan: Warna titik (dots/grid) secara default mengikuti --accent-color global
            // Kita bisa menambahkan kustomisasi warna khusus dot/grid nanti jika diperlukan.
        });
    });

    // 3. Fungsi Mengubah Warna Latar
    if (colorPicker) {
        // Ambil warna awal dari tema
        const computedStyle = getComputedStyle(document.documentElement);
        const defaultBgColor = computedStyle.getPropertyValue('--card-bg').trim();
        
        // Kita menggunakan style.backgroundColor inline agar menimpa warna default
        colorPicker.addEventListener('input', (e) => {
            const chosenColor = e.target.value;
            editorContentArea.style.backgroundColor = chosenColor;
        });
    }
}
