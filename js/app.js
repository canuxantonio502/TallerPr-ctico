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

// =========================================
// 1. ESTADO GLOBAL Y DATOS INICIALES
// =========================================
let students = [];
let chartInstance = null;
let currentEditId = null;

// =========================================
// 2. REFERENCIAS AL DOM
// =========================================
const gridContainer = document.getElementById('students-grid');
const searchInput = document.getElementById('filter-search');
const citySelect = document.getElementById('filter-city');
const planSelect = document.getElementById('filter-plan');
const modal = document.getElementById('student-modal');
const form = document.getElementById('student-form');

// =========================================
// 3. INICIALIZACIÓN
// =========================================
document.addEventListener('DOMContentLoaded', async () => {
    await loadData();
    populateCityFilter();
    renderStudents(students);
    initChart();
    setupEventListeners();
});

async function loadData() {
    const storedData = localStorage.getItem('edutrack_students');
    if (storedData) {
        students = JSON.parse(storedData);
    } else {
        // Utilizamos la función de validación que ya creaste para cargar el JSON
        const result = await validarDatosEstudiantes('../JSON/ejemplo.json');
        if (result && result.data) {
            students = result.data; // Carga los 35 registros de tu JSON
        } else {
            students = []; // Si hay error (ej: ruta incorrecta), iniciamos vacío
        }
        saveData();
    }
}

function saveData() {
    localStorage.setItem('edutrack_students', JSON.stringify(students));
}

// =========================================
// 4. RENDERIZADO DOM (TEMPLATE LITERALS)
// =========================================
function renderStudents(dataToRender) {
    if (dataToRender.length === 0) {
        gridContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #64748B;">No se encontraron estudiantes que coincidan con los filtros.</p>`;
        return;
    }

    gridContainer.innerHTML = dataToRender.map(student => `
        <article class="student-card">
            <div class="card-header">
                <div>
                    <h3 class="student-name">${student.nombre}</h3>
                    <span class="student-email">${student.email}</span>
                </div>
                <span class="badge badge-${student.plan.toLowerCase()}">${student.plan}</span>
            </div>
            
            <div class="student-detail">
                <strong>📍 Ciudad:</strong> ${student.ciudad}
            </div>
            <div class="student-detail">
                <strong>📚 Curso:</strong> ${student.curso}
            </div>

            <div class="progress-container">
                <div class="progress-label">
                    <span>Avance</span>
                    <strong>${student.progreso}%</strong>
                </div>
                <div class="progress-track">
                    <div class="progress-fill" style="width: ${student.progreso}%"></div>
                </div>
            </div>

            <div class="card-actions">
                <button class="btn-action btn-edit" onclick="openModal(${student.id})">Editar</button>
                <button class="btn-action btn-delete" onclick="deleteStudent(${student.id})">Eliminar</button>
            </div>
        </article>
    `).join('');
}

// =========================================
// 5. FILTROS Y BÚSQUEDA
// =========================================
function populateCityFilter() {
    // Extraer ciudades únicas
    const cities = [...new Set(students.map(s => s.ciudad))].sort();
    citySelect.innerHTML = `<option value="all">Todas las ciudades</option>` + 
        cities.map(city => `<option value="${city}">${city}</option>`).join('');
}

function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase();
    const cityFilter = citySelect.value;
    const planFilter = planSelect.value;

    const filtered = students.filter(student => {
        const matchSearch = student.nombre.toLowerCase().includes(searchTerm) || 
                            student.email.toLowerCase().includes(searchTerm);
        const matchCity = cityFilter === 'all' || student.ciudad === cityFilter;
        const matchPlan = planFilter === 'all' || student.plan.toLowerCase() === planFilter;
        
        return matchSearch && matchCity && matchPlan;
    });

    renderStudents(filtered);
    updateChartData(filtered);
}

function setupEventListeners() {
    searchInput.addEventListener('input', applyFilters);
    citySelect.addEventListener('change', applyFilters);
    planSelect.addEventListener('change', applyFilters);
    
    // Modal events
    document.getElementById('btn-add-student').addEventListener('click', () => openModal());
    document.getElementById('btn-close-modal').addEventListener('click', closeModal);
    form.addEventListener('submit', handleFormSubmit);
}

// =========================================
// 6. OPERACIONES CRUD Y MODAL
// =========================================
window.openModal = (id = null) => {
    currentEditId = id;
    const modalTitle = document.getElementById('modal-title');
    
    if (id) {
        modalTitle.textContent = 'Editar Estudiante';
        const student = students.find(s => s.id === id);
        document.getElementById('form-name').value = student.nombre;
        document.getElementById('form-email').value = student.email;
        document.getElementById('form-city').value = student.ciudad;
        document.getElementById('form-course').value = student.curso;
        document.getElementById('form-progress').value = student.progreso;
        document.getElementById('form-plan').value = student.plan;
    } else {
        modalTitle.textContent = 'Agregar Estudiante';
        form.reset();
    }
    modal.classList.add('active');
};

window.closeModal = () => {
    modal.classList.remove('active');
    form.reset();
    currentEditId = null;
};

function handleFormSubmit(e) {
    e.preventDefault();

    // Validaciones nativas de HTML5 controlan formato de email y rangos,
    // extraemos los valores limpios
    const newStudent = {
        nombre: document.getElementById('form-name').value.trim(),
        email: document.getElementById('form-email').value.trim(),
        ciudad: document.getElementById('form-city').value.trim(),
        curso: document.getElementById('form-course').value.trim(),
        progreso: parseInt(document.getElementById('form-progress').value, 10),
        plan: document.getElementById('form-plan').value
    };

    if (currentEditId) {
        // Actualizar
        const index = students.findIndex(s => s.id === currentEditId);
        students[index] = { ...students[index], ...newStudent };
    } else {
        // Crear nuevo (Generar ID simple basado en timestamp)
        newStudent.id = Date.now();
        students.push(newStudent);
    }

    saveData();
    populateCityFilter(); // Actualizar el select por si hay nueva ciudad
    applyFilters();       // Renderiza y actualiza gráfico respetando filtros activos
    closeModal();
}

window.deleteStudent = (id) => {
    if (confirm('¿Estás seguro de que deseas eliminar este registro? Esta acción no se puede deshacer.')) {
        students = students.filter(s => s.id !== id);
        saveData();
        populateCityFilter();
        applyFilters();
    }
};

// =========================================
// 7. CHART.JS (Visualización)
// =========================================
function initChart() {
    const ctx = document.getElementById('cityChart').getContext('2d');
    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: getChartData(students),
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                title: { display: true, text: 'Distribución de Estudiantes por Ciudad', font: { size: 16 } }
            },
            scales: {
                y: { beginAtZero: true, ticks: { stepSize: 1 } }
            }
        }
    });
}

function updateChartData(dataToChart) {
    if (!chartInstance) return;
    const newData = getChartData(dataToChart);
    chartInstance.data.labels = newData.labels;
    chartInstance.data.datasets = newData.datasets;
    chartInstance.update();
}

function getChartData(data) {
    // Reducir array para contar estudiantes por ciudad
    const cityCounts = data.reduce((acc, student) => {
        acc[student.ciudad] = (acc[student.ciudad] || 0) + 1;
        return acc;
    }, {});

    return {
        labels: Object.keys(cityCounts),
        datasets: [{
            label: 'Total de Estudiantes',
            data: Object.values(cityCounts),
            backgroundColor: '#10B981', // --accent-green
            borderRadius: 4
        }]
    };
}