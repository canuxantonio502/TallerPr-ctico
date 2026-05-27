/**
 * Módulo para gestionar el Sidebar interactivo
 * Permite inicializar el menú pasando los IDs de los elementos
 */
const SidebarModule = (() => {
    
    const init = (buttonId, sidebarId, overlayId) => {
        // Seleccionar elementos del DOM
        const toggleBtn = document.getElementById(buttonId);
        const sidebar = document.getElementById(sidebarId);
        const overlay = document.getElementById(overlayId);

        // Validación para evitar errores si un elemento no existe
        if (!toggleBtn || !sidebar || !overlay) {
            console.warn("SidebarModule: No se encontraron todos los elementos requeridos.");
            return;
        }

        // Función para alternar clases de estado
        const toggleMenu = () => {
            sidebar.classList.toggle('is-open');
            overlay.classList.toggle('is-active');
            toggleBtn.classList.toggle('is-active'); // Activa la animación a "X"
        };

        // Función para cerrar forzosamente (ej. al hacer click en overlay)
        const closeMenu = () => {
            sidebar.classList.remove('is-open');
            overlay.classList.remove('is-active');
            toggleBtn.classList.remove('is-active');
        };

        // Asignar Event Listeners
        toggleBtn.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', closeMenu);

        // Opcional pero recomendado para accesibilidad: Cerrar con la tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sidebar.classList.contains('is-open')) {
                closeMenu();
            }
        });
    };

    // Exponer la función pública
    return {
        init
    };

})();

// Inicializar cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    SidebarModule.init('menu-toggle', 'sidebar', 'sidebar-overlay');
});