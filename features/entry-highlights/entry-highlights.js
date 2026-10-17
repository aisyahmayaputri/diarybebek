// Data Dummy untuk Buku & Film
const yearlyHighlights = [
    { type: 'film', title: 'The Matrix', rating: '⭐⭐⭐⭐⭐', icon: '🎬' },
    { type: 'buku', title: 'Atomic Habits', rating: '⭐⭐⭐⭐', icon: '📖' },
    { type: 'film', title: 'Spirited Away', rating: '⭐⭐⭐⭐⭐', icon: '🐉' },
    { type: 'buku', title: 'Norwegian Wood', rating: '⭐⭐⭐', icon: '🌳' }
];

// Data Dummy untuk Jurnal
const recentJournals = [
    {
        date: '18 Okt 2026',
        time: '05:30 AM',
        title: 'Pagi yang tenang di Manado',
        preview: 'Hari ini aku bangun lebih awal, merapikan meja, dan mendengarkan lagu loml dari Taylor Swift. Rasanya sangat damai.',
        tags: ['Happy Day', 'Morning']
    },
    {
        date: '17 Okt 2026',
        time: '20:15 PM',
        title: 'Nongkrong Bareng Bestie',
        preview: 'Pergi keluar bareng guy bestie. Kita makan gelato dan ngobrolin banyak hal sampai malam.',
        tags: ['Hangout', 'Food']
    }
];

export function initEntryHighlights() {
    const highlightsContainer = document.getElementById('yearly-highlights-container');
    const journalContainer = document.getElementById('recent-journal-container');

    // 1. Render Kartu Sorotan Tahunan (Buku/Film)
    if (highlightsContainer) {
        yearlyHighlights.forEach(item => {
            const card = document.createElement('div');
            card.className = 'highlight-card bounce-hover';
            
            card.innerHTML = `
                <div class="highlight-cover">${item.icon}</div>
                <div class="highlight-info">
                    <div class="title">${item.title}</div>
                    <div class="rating">${item.rating}</div>
                </div>
            `;
            highlightsContainer.appendChild(card);
        });
    }

    // 2. Render Kartu Jurnal Terbaru
    if (journalContainer) {
        recentJournals.forEach(entry => {
            const card = document.createElement('div');
            card.className = 'journal-card bounce-hover';
            
            // Render tags menjadi HTML string
            const tagsHTML = entry.tags.map(tag => `<span class="tag-badge">${tag}</span>`).join('');

            card.innerHTML = `
                <div class="journal-header">
                    <span>${entry.date}</span>
                    <span>${entry.time}</span>
                </div>
                <div class="journal-title">${entry.title}</div>
                <div class="journal-preview">${entry.preview}</div>
                <div class="journal-tags">${tagsHTML}</div>
            `;
            journalContainer.appendChild(card);
        });
    }
}
