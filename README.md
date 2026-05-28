# EduTrack - Dashboard de Gestión de Estudiantes 🇬🇹🚀

> Plataforma administrativa web orientada al ecosistema EdTech en Guatemala, diseñada para gestionar, filtrar y visualizar el progreso de los estudiantes en tiempo real. 

Este proyecto fue desarrollado bajo una arquitectura limpia y modular sin el uso de frameworks pesados, priorizando el rendimiento, la accesibilidad y una experiencia de usuario (UX) moderna e intuitiva.

## 🛠️ Stack Tecnológico

* **HTML5:** Estructura semántica optimizada para accesibilidad.
* **CSS3 (Puro):** Metodología Mobile-First, CSS Grid, Flexbox y Custom Properties (Variables) para un mantenimiento escalable. No se utilizó Bootstrap ni Tailwind.
* **JavaScript (Vanilla JS):** Lógica de negocio, manipulación del DOM, Template Literals y gestión del estado mediante el estándar ES6+.
* **Chart.js:** Librería externa implementada mediante CDN para la visualización dinámica de datos.
* **Web Storage API:** Uso de `localStorage` para persistencia de datos en el lado del cliente.

## ✨ Características Principales

1. **CRUD Completo:** Capacidad de crear, leer, actualizar y eliminar registros de estudiantes desde una interfaz de usuario interactiva (Modales).
2. **Filtrado en Tiempo Real:** Motor de búsqueda integrado para filtrar estudiantes simultáneamente por:
   * Nombre o Correo Electrónico (Input de texto).
   * Ciudad de residencia (Select dinámico).
   * Plan de suscripción (Select estático).
3. **Persistencia de Datos:** El estado de la aplicación sobrevive a la recarga del navegador gracias a la integración con `localStorage`. Si el almacenamiento está vacío, el sistema inyecta un dataset inicial de prueba automáticamente.
4. **Visualización Analítica:** Gráfico de barras interactivo que reacciona a los filtros activos, mostrando la distribución geográfica de los estudiantes.
5. **Diseño Responsivo:** Interfaz fluida que se adapta desde dispositivos móviles hasta pantallas Ultra-Wide, garantizando legibilidad y usabilidad.

## 📂 Estructura del Proyecto

```text
/
├── css/
│   ├── catalogo.css           # Estilos específicos para la vista del catálogo
│   ├── dashboard_styles.css   # Layout y estilos del panel de control (sidebar, cards)
│   ├── landing_styles.css     # Estilos de la página de inicio/hero section
│   └── style.css              # Variables globales y estilos base compartidos
│
├── js/
│   ├── app.js                 # Lógica principal, CRUD de estudiantes y Chart.js
│   ├── catalogo.js            # Lógica para renderizar y filtrar el catálogo
│   ├── dashboard.js           # Lógica específica de las métricas del dashboard
│   ├── sidebar.js             # Módulo independiente para el menú hamburguesa
│   └── validacion.js          # Funciones compartidas para validar formularios
│
├── JSON/
│   └── ejemplo.json           # Dataset inicial estructurado de estudiantes
│
├── catalogo.html              # Vista de cursos disponibles
├── dashboard.html             # Vista principal del estudiante (KPIs y progreso)
├── estudiantes.html           # Vista administrativa (Gestión y tabla CRUD)
└── index.html                 # Landing page principal de EduTrack
```

## 🚀 Instalación y uso local

Al ser un proyecto estático sin dependencias de BackEnd, su ejecucción es inmediata:

1. Clona este repositorio:

```bash
git clone https://github.com/canuxantonio502/TallerPr-ctico.git
```

2. Abre el directorio del proyecto en tu editor de código favorito (ej. VS Code).

3. Ejecuta el archivo index.html en tu navegador directamente o utiliza una extensión como Live Server para una experiencia de desarrollo óptima.

## :feather: Autores

He aquí los responsables de que este proyecto se haya podido llevar a cabo:

* **Antonio Canux** - *Único colaborador* - [canuxantonio502](https://github.com/canuxantonio502)
