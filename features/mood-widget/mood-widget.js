// Daftar mood dasar (bisa dikembangkan nanti dengan slider intensitas)
const availableMoods = [
    { id: 'm1', label: '😊 Bahagia' },
    { id: 'm2', label: '😌 Tenang' },
    { id: 'm3', label: '😢 Sedih' },
    { id: 'm4', label: '😤 Marah' },
    { id: 'm5', label: '😴 Lelah' },
    { id: 'm6', label: '✨ Semangat' }
];

// Menyimpan mood yang dipilih hari ini
let selectedMoods = new Set();

export function initMoodWidget() {
    const container = document.getElementById('mood-container');
    if (!container) return;

    // Render tombol mood
    availableMoods.forEach(mood => {
        const btn = document.createElement('button');
        btn.className = 'mood-chip bounce-hover';
        btn.textContent = mood.label;
        btn.dataset.id = mood.id;

        btn.addEventListener('click', () => {
            // Toggle seleksi (Multi-select)
            if (selectedMoods.has(mood.id)) {
                selectedMoods.delete(mood.id);
                btn.classList.remove('selected');
            } else {
                selectedMoods.add(mood.id);
                btn.classList.add('selected');
            }
            
            console.log("Mood hari ini:", Array.from(selectedMoods));
        });

        container.appendChild(btn);
    });
}
