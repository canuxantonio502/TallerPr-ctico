document.addEventListener('DOMContentLoaded', () => {
    // 1. Verificación de Seguridad (Autenticación)
    const storedUser = localStorage.getItem('edutrack_user');
    if (!storedUser) {
        alert("Acceso denegado. Por favor inicia sesión o regístrate.");
        window.location.href = 'index.html';
        return;
    }

    // 2. Personalizar la interfaz con los datos del usuario
    const user = JSON.parse(storedUser);
    const userNameElements = document.querySelectorAll('.user-name');
    const greetingElement = document.querySelector('.greeting');
    
    userNameElements.forEach(el => el.textContent = user.name);
    if (greetingElement) {
        // Extraemos solo el primer nombre para el saludo
        greetingElement.textContent = `¡Hola, ${user.name.split(' ')[0]}! 👋`;
    }

    // 3. Botón de Cerrar Sesión en el Dashboard
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