document.addEventListener('DOMContentLoaded', () => {
    // 1. Selección de elementos del DOM
    const modal = document.getElementById('register-modal');
    const btnClose = document.getElementById('close-modal');
    const registerForm = document.getElementById('register-form');
    
    // Seleccionamos todos los botones que deberían abrir el registro
    // (Actualiza los href de tus botones en HTML para que coincidan o usen una clase específica)
    const registerTriggers = document.querySelectorAll('.btn-primary, .btn-large-primary');

    // 2. Función para abrir el modal
    const openModal = (e) => {
        // Solo prevenimos el comportamiento por defecto si el botón es un link (etiqueta a)
        if(e.target.tagName === 'A') {
            e.preventDefault(); 
        }
        modal.classList.add('is-active');
    };

    // 3. Función para cerrar el modal
    const closeModal = () => {
        modal.classList.remove('is-active');
        registerForm.reset(); // Limpia los inputs al cerrar
    };

    // 4. Asignar eventos de apertura a los botones
    registerTriggers.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    // 5. Asignar eventos de cierre
    btnClose.addEventListener('click', closeModal);

    // Cerrar el modal si el usuario hace clic fuera del recuadro blanco
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Cerrar el modal con la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-active')) {
            closeModal();
        }
    });

    // 6. Simular el CRUD / Envío del formulario
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que la página se recargue

        // Capturar los valores de los inputs
        const userName = document.getElementById('reg-name').value;
        const userEmail = document.getElementById('reg-email').value;

        // Aquí iría tu lógica asíncrona real (fetch a tu API / backend)
        console.log('Nuevo registro interceptado:', { nombre: userName, email: userEmail });

        // Simulamos una alerta de éxito
        alert(`¡Excelente decisión, ${userName}! Hemos recibido tu correo (${userEmail}). Nos pondremos en contacto contigo pronto.`);

        // Limpiamos y cerramos
        closeModal();
    });
});