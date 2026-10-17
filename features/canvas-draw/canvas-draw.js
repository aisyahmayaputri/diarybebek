export function initCanvasDraw() {
    const canvas = document.getElementById('draw-layer');
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let isDrawing = false;
    
    // Konfigurasi Alat Default
    let currentTool = 'pen';
    let currentColor = '#3E2723';
    let currentLineWidth = 3;

    // Sistem Undo / Redo
    let historyStack = [];
    let redoStack = [];

    const btnUndo = document.getElementById('btn-undo');
    const btnRedo = document.getElementById('btn-redo');

    // Fungsi menyimpan status kanvas ke riwayat
    const saveState = () => {
        historyStack.push(canvas.toDataURL());
        redoStack = []; // Kosongkan redo saat ada coretan baru
        updateUndoRedoUI();
    };

    const updateUndoRedoUI = () => {
        btnUndo.disabled = historyStack.length === 0;
        btnRedo.disabled = redoStack.length === 0;
    };

    // Fungsi menggambar ulang dari status (Undo/Redo)
    const restoreState = (dataUrl) => {
        const img = new Image();
        img.src = dataUrl;
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
    };

    // Sinkronisasi resolusi internal kanvas dengan ukuran tampilan
    window.resizeCanvas = () => {
        // Simpan gambar sementara agar tidak hilang saat resize
        const tempImage = canvas.toDataURL(); 
        
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        if (historyStack.length > 0) {
            restoreState(tempImage);
        }
    };

    // === EVENT LISTENERS MENGGAMBAR ===

    // Untuk sentuhan/stylus (HP/Tablet) dan Mouse (Desktop)
    const startPosition = (e) => {
        isDrawing = true;
        ctx.beginPath();
        draw(e);
    };

    const endPosition = () => {
        if (!isDrawing) return;
        isDrawing = false;
        ctx.beginPath(); // Putus garis
        saveState(); // Simpan riwayat setelah 1 coretan selesai
    };

    const draw = (e) => {
        if (!isDrawing) return;

        // Cegah layar bergulir saat mencoret di HP
        e.preventDefault(); 

        // Dapatkan koordinat akurat (mouse atau touch)
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        // Pengaturan Tinta berdasarkan Alat
        ctx.lineWidth = currentLineWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        if (currentTool === 'eraser') {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.lineWidth = 20; // Penghapus lebih tebal
        } else {
            ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = currentColor;
            
            if (currentTool === 'highlight') {
                // Warna tembus pandang untuk highlighter (opacity 30%)
                ctx.globalAlpha = 0.3;
                ctx.lineWidth = 15;
            } else {
                ctx.globalAlpha = 1.0;
                ctx.lineWidth = 3;
            }
        }

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    // Pasang Event
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseout', endPosition);

    // Event Sentuh (Touch)
    canvas.addEventListener('touchstart', startPosition, { passive: false });
    canvas.addEventListener('touchend', endPosition);
    canvas.addEventListener('touchmove', draw, { passive: false });


    // === KONTROL ALAT MENGGAMBAR ===

    // Ubah Warna
    document.getElementById('color-picker').addEventListener('input', (e) => {
        currentColor = e.target.value;
        currentTool = 'pen'; // Otomatis balik ke pena jika ganti warna
        updateToolUI('pen');
    });

    // Ubah Alat (Pena, Highlighter, Penghapus)
    document.querySelectorAll('.draw-tool').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tool = e.currentTarget.dataset.tool;
            currentTool = tool;
            updateToolUI(tool);
        });
    });

    const updateToolUI = (activeTool) => {
        document.querySelectorAll('.draw-tool').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tool === activeTool) btn.classList.add('active');
        });
    };

    // Tombol Undo
    btnUndo.addEventListener('click', () => {
        if (historyStack.length > 0) {
            redoStack.push(canvas.toDataURL()); // Simpan ke redo
            historyStack.pop(); // Hapus state sekarang
            
            if (historyStack.length > 0) {
                restoreState(historyStack[historyStack.length - 1]);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height); // Kosong
            }
            updateUndoRedoUI();
        }
    });

    // Tombol Redo
    btnRedo.addEventListener('click', () => {
        if (redoStack.length > 0) {
            const state = redoStack.pop();
            historyStack.push(state);
            restoreState(state);
            updateUndoRedoUI();
        }
    });
}
