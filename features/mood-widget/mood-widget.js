const fifteenMoods = [
    { id: 'm1', label: '😊 Senang' }, { id: 'm2', label: '😌 Damai' }, { id: 'm3', label: '🤩 Semangat' },
    { id: 'm4', label: '😢 Sedih' }, { id: 'm5', label: '😤 Kesal' }, { id: 'm6', label: '😴 Lelah' },
    { id: 'm7', label: '😰 Cemas' }, { id: 'm8', label: '🥰 Kasmaran' }, { id: 'm9', label: '🤔 Bingung' },
    { id: 'm10', label: '🤧 Sakit' }, { id: 'm11', label: '😎 Bangga' }, { id: 'm12', label: '😶 Hampa' },
    { id: 'm13', label: '🫠 Kewalahan' }, { id: 'm14', label: '🤤 Lapar' }, { id: 'm15', label: '🥳 Merayakan' }
];

export function initMoodWidget() {
    const container = document.getElementById('mood-container');
    if (!container) return;

    fifteenMoods.forEach(mood => {
        // Wrapper untuk chip dan slider intensitas
        const wrapper = document.createElement('div');
        wrapper.className = 'mood-item-wrapper';

        // Chip Emosi
        const btn = document.createElement('button');
        btn.className = 'mood-chip hand-drawn bounce-hover';
        btn.textContent = mood.label;

        // Kontainer Intensitas (Tersembunyi default)
        const intensityDiv = document.createElement('div');
        intensityDiv.className = 'intensity-selector hidden';
        intensityDiv.innerHTML = `
            <span>Intensitas: </span>
            <input type="range" min="1" max="5" value="3" class="mood-slider">
            <span class="intensity-val">3</span>
        `;

        const slider = intensityDiv.querySelector('.mood-slider');
        const valSpan = intensityDiv.querySelector('.intensity-val');

        slider.addEventListener('input', (e) => {
            valSpan.textContent = e.target.value;
            console.log(`${mood.label} intensitas diubah ke ${e.target.value}`);
        });

        // Logika Klik
        btn.addEventListener('click', () => {
            btn.classList.toggle('selected');
            if (btn.classList.contains('selected')) {
                intensityDiv.classList.remove('hidden');
            } else {
                intensityDiv.classList.add('hidden');
            }
        });

        wrapper.appendChild(btn);
        wrapper.appendChild(intensityDiv);
        container.appendChild(wrapper);
    });
}
