document.addEventListener('DOMContentLoaded', () => {
    // 1. Verificación de Seguridad
    const storedUser = localStorage.getItem('edutrack_user');
    if (!storedUser) {
        alert("Acceso denegado. Por favor inicia sesión o regístrate.");
        window.location.href = 'index.html';
        return;
    }

    const user = JSON.parse(storedUser);
    document.querySelectorAll('.user-name').forEach(el => el.textContent = user.name);

    // 2. Cerrar Sesión
    const logoutBtn = document.getElementById('btn-logout-dashboard');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
                localStorage.removeItem('edutrack_user');
                window.location.href = 'index.html';
            }
        });
    }

    // 3. Base de Datos Simulada de Cursos
    const courses = [
        { id: 1, title: "JavaScript Avanzado", category: "Frontend", price: "Q 250.00", img: "https://placehold.co/400x200?text=JavaScript", desc: "Domina asincronismo, closures y manipulación del DOM en profundidad." },
        { id: 2, title: "React desde Cero", category: "Frontend", price: "Q 300.00", img: "https://placehold.co/400x200?text=React", desc: "Crea interfaces interactivas modernas utilizando Hooks y Context API." },
        { id: 3, title: "Node.js Backend", category: "Backend", price: "Q 350.00", img: "https://placehold.co/400x200?text=Node.js", desc: "Construye APIs REST escalables, seguras y eficientes con Express." },
        { id: 4, title: "Python Fundamental", category: "Data", price: "Q 280.00", img: "https://placehold.co/400x200?text=Python", desc: "Iníciate en la programación orientada a la ciencia de datos y automatización." },
        { id: 5, title: "Bases de Datos SQL", category: "Backend", price: "Q 200.00", img: "https://placehold.co/400x200?text=SQL", desc: "Diseña, consulta y optimiza bases de datos relacionales corporativas." },
        { id: 6, title: "Arquitectura CSS", category: "Frontend", price: "Q 150.00", img: "https://placehold.co/400x200?text=CSS", desc: "Domina Flexbox, CSS Grid y el diseño de interfaces altamente responsivas." }
    ];

    // 4. Renderizar UI Base
    const mainApp = document.getElementById('catalog-app');
    mainApp.innerHTML = `
        <div class="catalog-header-container">
            <div>
                <h2 class="greeting" style="margin-bottom: 0.25rem;">Catálogo de Cursos</h2>
                <p class="greeting-subtitle">Explora y matricúlate en nuestras nuevas rutas de aprendizaje.</p>
            </div>
            <div class="catalog-controls">
                <input type="text" id="catalog-search" class="catalog-search" placeholder="Buscar curso...">
                <select id="catalog-filter" class="catalog-filter">
                    <option value="all">Todas las Categorías</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Data">Data & Analytics</option>
                </select>
            </div>
        </div>
        <div class="catalog-grid" id="catalog-grid"></div>
    `;

    const catalogGrid = document.getElementById('catalog-grid');
    const searchInput = document.getElementById('catalog-search');
    const filterSelect = document.getElementById('catalog-filter');

    // 5. Función de Renderizado de Tarjetas
    const renderCatalog = (data) => {
        catalogGrid.innerHTML = data.map(course => `
            <article class="catalog-card">
                <img src="${course.img}" alt="${course.title}" class="catalog-image">
                <div class="catalog-content">
                    <span style="background: #E0E7FF; color: #4338CA; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 600; width: fit-content;">${course.category}</span>
                    <h3 style="font-size: 1.1rem; color: var(--primary-dark); margin: 0;">${course.title}</h3>
                    <p style="color: var(--text-muted); font-size: 0.9rem; flex: 1;">${course.desc}</p>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
                        <span style="font-weight: bold; color: var(--primary-dark); font-size: 1.1rem;">${course.price}</span>
                        <button class="btn-enroll" onclick="alert('¡Inscripción solicitada para ${course.title}! Se ha enviado un correo con los detalles de pago.')">Inscribirse</button>
                    </div>
                </div>
            </article>
        `).join('');

        if (data.length === 0) {
            catalogGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); margin-top: 2rem;">No se encontraron cursos con los filtros actuales.</p>`;
        }
    };

    // 6. Funcionalidad de Filtrado
    const applyFilters = () => {
        const term = searchInput.value.toLowerCase();
        const category = filterSelect.value;
        const filtered = courses.filter(c => (category === 'all' || c.category === category) && (c.title.toLowerCase().includes(term) || c.desc.toLowerCase().includes(term)));
        renderCatalog(filtered);
    };

    searchInput.addEventListener('input', applyFilters);
    filterSelect.addEventListener('change', applyFilters);
    renderCatalog(courses); // Carga inicial
});