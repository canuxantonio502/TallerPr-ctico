document.addEventListener('DOMContentLoaded', () => {
    // Botón de Cerrar Sesión en el Dashboard
    const logoutBtn = document.getElementById('btn-logout-dashboard');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
                // Borramos el usuario del localStorage
                localStorage.removeItem('edutrack_user');
                // Redirigimos al inicio
                window.location.href = 'index.html';
            }
        });
    }
});