export function initTextFormat() {
    const btnToggleFormat = document.getElementById('btn-toggle-format');
    const btnExitFormat = document.getElementById('btn-exit-format');
    
    const mainToolbar = document.getElementById('main-toolbar');
    const formatToolbar = document.getElementById('format-toolbar');
    const textLayer = document.getElementById('text-layer');

    // 1. Logika Toggle Toolbar
    const setFormatMode = (isActive) => {
        if (isActive) {
            mainToolbar.classList.remove('active-toolbar');
            mainToolbar.classList.add('hidden-toolbar');
            formatToolbar.classList.remove('hidden-toolbar');
            formatToolbar.classList.add('active-toolbar');
        } else {
            formatToolbar.classList.remove('active-toolbar');
            formatToolbar.classList.add('hidden-toolbar');
            mainToolbar.classList.remove('hidden-toolbar');
            mainToolbar.classList.add('active-toolbar');
        }
    };

    if (btnToggleFormat) btnToggleFormat.addEventListener('click', () => setFormatMode(true));
    if (btnExitFormat) btnExitFormat.addEventListener('click', () => setFormatMode(false));

    // 2. Logika Format Tombol Dasar (Bold, Italic, List, dll)
    const formatBtns = document.querySelectorAll('.format-btn');
    formatBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Mencegah editor kehilangan fokus saat tombol ditekan
            e.preventDefault(); 
            
            const command = btn.dataset.command;
            const value = btn.dataset.value || null;

            // Eksekusi format ke dalam teks yang sedang diblok/dipilih
            document.execCommand(command, false, value);
            
            // Kembalikan fokus ke area teks
            if (textLayer) textLayer.focus();
        });
    });

    // 3. Logika Warna Teks & Highlight
    const textColorPicker = document.getElementById('text-color-picker');
    const textHighlightPicker = document.getElementById('text-highlight-picker');

    if (textColorPicker) {
        textColorPicker.addEventListener('input', (e) => {
            // 'foreColor' merubah warna teks
            document.execCommand('foreColor', false, e.target.value);
            if (textLayer) textLayer.focus();
        });
    }

    if (textHighlightPicker) {
        textHighlightPicker.addEventListener('input', (e) => {
            // 'hiliteColor' atau 'backColor' digunakan untuk highlight teks (seperti stabilo)
            document.execCommand('hiliteColor', false, e.target.value);
            // Fallback untuk beberapa browser tertentu
            document.execCommand('backColor', false, e.target.value);
            if (textLayer) textLayer.focus();
        });
    }
}
