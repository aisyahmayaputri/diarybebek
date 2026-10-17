export function initCreateMenu() {
    const btnAdd = document.getElementById('btn-add-new');
    const branches = document.getElementById('fab-branches');
    const branchBtns = document.querySelectorAll('.fab-branch-btn');

    let isOpen = false;

    if (btnAdd) {
        btnAdd.addEventListener('click', () => {
            isOpen = !isOpen;
            if (isOpen) {
                branches.classList.add('active');
                btnAdd.style.transform = 'rotate(45deg)'; // Plus berubah jadi X
            } else {
                branches.classList.remove('active');
                btnAdd.style.transform = 'rotate(0deg)';
            }
        });
    }

    branchBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const type = e.currentTarget.dataset.type;
            console.log(`Pilih: ${type}`);
            
            // Tutup menu
            isOpen = false;
            branches.classList.remove('active');
            btnAdd.style.transform = 'rotate(0deg)';

            if (type === 'entry' && typeof window.openEditor === 'function') {
                setTimeout(() => window.openEditor(), 300);
            }
        });
    });
}
