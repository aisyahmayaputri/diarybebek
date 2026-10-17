export function initCreateMenu() {
    const btnAdd = document.getElementById('btn-add-new');
    const overlay = document.getElementById('create-menu-overlay');
    const menu = document.getElementById('create-menu');
    const menuItems = document.querySelectorAll('.menu-item');

    // Fungsi buka menu
    const openMenu = () => {
        overlay.classList.remove('hidden');
        menu.classList.remove('hidden');
    };

    // Fungsi tutup menu
    const closeMenu = () => {
        overlay.classList.add('hidden');
        menu.classList.add('hidden');
    };

    // Event Listeners
    if (btnAdd) btnAdd.addEventListener('click', openMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);

    // Menangkap klik pada masing-masing opsi
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const type = e.target.closest('.menu-item').dataset.type;
            console.log(`Pengguna memilih untuk membuat: ${type}`);
            
            // Animasi tutup menu setelah memilih
            closeMenu();
            
            // Catatan: Transisi ke halaman "Editor" akan di-handle nanti
            // Tidak ada auto-buka keyboard di sini.
        });
    });
}
