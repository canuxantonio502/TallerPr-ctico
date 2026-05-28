async function cargarJSON(url) {
    try {
        // 1. Hacemos la petición a la ruta del archivo
        const respuesta = await fetch(url);

        // 2. Verificamos que la petición haya sido exitosa (código HTTP 200-299)
        if (!respuesta.ok) {
            throw new Error(`No se pudo cargar el JSON. Estado HTTP: ${respuesta.status}`);
        }

        // 3. Transformamos la respuesta en un objeto JavaScript
        const datos = await respuesta.json();

        // 4. Procesamos o retornamos los datos
        console.log("Datos cargados con éxito:", datos);
        return datos;

    } catch (error) {
        // Capturamos y mostramos cualquier error (ej. archivo no encontrado, error de red)
        console.error("Error al hacer fetch al JSON:", error);
    }
}

// Ejemplo de cómo llamarlo (asegúrate de que la ruta sea correcta desde donde lo ejecutes)
cargarJSON('../JSON/ejemplo.json').then(datos => {
    if (datos) {
        // Aquí puedes ejecutar funciones adicionales pasándole los datos
        // por ejemplo: renderizarTabla(datos);
    }
});


async function validarDatosEstudiantes(jsonUrl) {
    try {
        // 1. Cargar el JSON
        const response = await fetch(jsonUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        let isValid = true;
        const errors = [];

        // 2. Iterar sobre cada registro para validarlo
        data.forEach((estudiante, index) => {
            const rowInfo = `Fila ${index + 1} (ID: ${estudiante.id})`;

            // Validar ID: Debe ser un número entero positivo
            if (typeof estudiante.id !== 'number' || estudiante.id <= 0) {
                errors.push(`${rowInfo} - 'id' inválido.`);
            }

            // Validar Nombre: Debe ser texto y no estar vacío
            if (typeof estudiante.nombre !== 'string' || estudiante.nombre.trim() === '') {
                errors.push(`${rowInfo} - 'nombre' está vacío o no es texto.`);
            }

            // Validar Email: Uso de expresión regular para formato correcto
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(estudiante.email)) {
                errors.push(`${rowInfo} - 'email' tiene un formato incorrecto (${estudiante.email}).`);
            }

            // Validar Progreso: Número entre 0 y 100
            if (typeof estudiante.progreso !== 'number' || estudiante.progreso < 0 || estudiante.progreso > 100) {
                errors.push(`${rowInfo} - 'progreso' fuera de rango (${estudiante.progreso}).`);
            }

            // Validar Fecha de Inscripción: Formato YYYY-MM-DD y que sea una fecha real
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            // Date.parse devuelve NaN si la fecha es inválida (ej. mes 22)
            if (!dateRegex.test(estudiante.fechaInscripcion) || isNaN(Date.parse(estudiante.fechaInscripcion))) {
                errors.push(`${rowInfo} - 'fechaInscripcion' inválida (${estudiante.fechaInscripcion}).`);
            }

            // Validar Plan: Solo permitir valores específicos
            const planesPermitidos = ['basico', 'estàndar', 'premium'];
            if (!planesPermitidos.includes(estudiante.plan)) {
                errors.push(`${rowInfo} - 'plan' no reconocido (${estudiante.plan}).`);
            }

            // Validar Monto USD: Aunque está como string ("99"), debe poder convertirse a número
            if (isNaN(Number(estudiante.montoUSD))) {
                errors.push(`${rowInfo} - 'montoUSD' no es numérico (${estudiante.montoUSD}).`);
            }

            // Validar Activo: Debe ser estrictamente un booleano (true o false)
            if (typeof estudiante.activo !== 'boolean') {
                errors.push(`${rowInfo} - 'activo' no es un booleano.`);
            }
        });

        // 3. Resultados de la validación
        if (errors.length > 0) {
            console.error("❌ Se encontraron los siguientes errores en el JSON:", errors);
            isValid = false;
        } else {
            console.log("✅ Todos los datos del JSON pasaron la validación correctamente.");
        }

        return { isValid, data, errors };

    } catch (error) {
        console.error("Error al obtener o procesar el JSON:", error);
    }
}

// Ejemplo de uso: Ejecutar una vez que el DOM cargue
document.addEventListener('DOMContentLoaded', () => {
    // Asegúrate de colocar la ruta correcta hacia tu JSON dependiendo desde dónde ejecutas el HTML
    validarDatosEstudiantes('../JSON/ejemplo.json');
});
