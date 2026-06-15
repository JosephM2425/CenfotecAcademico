const DB = {
  produccion: [
    {
      id: 1,
      titulo: "Sistema de gestión hospitalaria basado en microservicios",
      autor: "María Fernández López",
      coautores: "Carlos Ramírez, Ana Mora",
      tipo: "Tesis",
      categoria: "Pregrado",
      area: "Ingeniería de Software",
      tecnologias: ["Java", "Spring Boot", "Docker"],
      tipoInvestigacion: "Aplicada",
      carrera: "Ingeniería en Sistemas",
      linea: "Desarrollo de Software",
      anio: 2024,
      estado: "Publicado",
      resumen:
        "Propuesta de arquitectura de microservicios para un sistema hospitalario integral que mejora la escalabilidad y mantenibilidad.",
      fecha: "2024-03-15",
      documento: "tesis_hospitalaria.pdf",
    },
    {
      id: 2,
      titulo: "Análisis de sentimientos en redes sociales usando NLP",
      autor: "José Rodríguez Vargas",
      coautores: "Laura Jiménez",
      tipo: "Artículo",
      categoria: "Posgrado",
      area: "Inteligencia Artificial",
      tecnologias: ["Python", "TensorFlow", "NLTK"],
      tipoInvestigacion: "Básica",
      carrera: "Ingeniería en Sistemas",
      linea: "Inteligencia Artificial",
      anio: 2024,
      estado: "Publicado",
      resumen:
        "Estudio comparativo de modelos de procesamiento de lenguaje natural para clasificación de sentimientos en Twitter.",
      fecha: "2024-02-20",
      documento: "articulo_nlp.pdf",
    },
    {
      id: 3,
      titulo: "Plataforma e-learning adaptativa con gamificación",
      autor: "Andrea Castillo Solano",
      coautores: "Pedro Sánchez, María Torres",
      tipo: "Proyecto de Graduación",
      categoria: "Pregrado",
      area: "Tecnología Educativa",
      tecnologias: ["React", "Node.js", "MongoDB"],
      tipoInvestigacion: "Aplicada",
      carrera: "Ingeniería en Sistemas",
      linea: "Tecnología Educativa",
      anio: 2023,
      estado: "Publicado",
      resumen:
        "Desarrollo de plataforma educativa que adapta el contenido según el perfil de aprendizaje del estudiante.",
      fecha: "2023-11-10",
      documento: "proyecto_elearning.pdf",
    },
    {
      id: 4,
      titulo: "Blockchain para trazabilidad de cadenas de suministro",
      autor: "Roberto Méndez Arias",
      coautores: "",
      tipo: "Tesis",
      categoria: "Posgrado",
      area: "Tecnologías Emergentes",
      tecnologias: ["Solidity", "Ethereum", "Web3.js"],
      tipoInvestigacion: "Exploratoria",
      carrera: "Ingeniería en Sistemas",
      linea: "Tecnologías Emergentes",
      anio: 2024,
      estado: "En revisión",
      resumen:
        "Implementación de un sistema basado en blockchain para garantizar la trazabilidad en cadenas de suministro agrícolas.",
      fecha: "2024-01-08",
      documento: "tesis_blockchain.pdf",
    },
    {
      id: 5,
      titulo: "Impacto de la inteligencia artificial en la educación superior",
      autor: "Carmen Vargas Rojas",
      coautores: "Luis Herrera",
      tipo: "Artículo",
      categoria: "Investigación",
      area: "Inteligencia Artificial",
      tecnologias: ["Python", "Scikit-learn"],
      tipoInvestigacion: "Descriptiva",
      carrera: "Administración de Empresas",
      linea: "Innovación Educativa",
      anio: 2023,
      estado: "Publicado",
      resumen:
        "Análisis del impacto de herramientas de IA en el rendimiento académico de estudiantes universitarios.",
      fecha: "2023-09-25",
      documento: "articulo_ia_educacion.pdf",
    },
    {
      id: 6,
      titulo: "App móvil para monitoreo de calidad del aire",
      autor: "Daniel Zúñiga Paredes",
      coautores: "Sofía Blanco",
      tipo: "Proyecto de Graduación",
      categoria: "Pregrado",
      area: "Internet de las Cosas",
      tecnologias: ["Flutter", "Firebase", "Arduino"],
      tipoInvestigacion: "Aplicada",
      carrera: "Ingeniería en Sistemas",
      linea: "IoT y Sistemas Embebidos",
      anio: 2024,
      estado: "Publicado",
      resumen:
        "Aplicación móvil que integra sensores IoT para monitorear la calidad del aire en tiempo real en zonas urbanas.",
      fecha: "2024-04-01",
      documento: "proyecto_aire.pdf",
    },
    {
      id: 7,
      titulo: "Optimización de algoritmos genéticos para scheduling",
      autor: "Patricia León Campos",
      coautores: "Miguel Ángel Reyes",
      tipo: "Tesis",
      categoria: "Posgrado",
      area: "Inteligencia Artificial",
      tecnologias: ["Python", "NumPy", "DEAP"],
      tipoInvestigacion: "Básica",
      carrera: "Ingeniería en Sistemas",
      linea: "Inteligencia Artificial",
      anio: 2023,
      estado: "Publicado",
      resumen:
        "Propuesta de mejora en operadores de algoritmos genéticos aplicados a problemas de programación de tareas.",
      fecha: "2023-08-14",
      documento: "tesis_geneticos.pdf",
    },
    {
      id: 8,
      titulo: "Sistema de recomendación para bibliotecas digitales",
      autor: "Fernando Aguilar Soto",
      coautores: "Isabel Mora, Ricardo Peña",
      tipo: "Artículo",
      categoria: "Investigación",
      area: "Ingeniería de Software",
      tecnologias: ["Python", "Collaborative Filtering", "PostgreSQL"],
      tipoInvestigacion: "Aplicada",
      carrera: "Ingeniería en Sistemas",
      linea: "Desarrollo de Software",
      anio: 2024,
      estado: "En revisión",
      resumen:
        "Modelo de filtrado colaborativo para mejorar la discoverability en repositorios académicos digitales.",
      fecha: "2024-05-12",
      documento: "articulo_recomendacion.pdf",
    },
    {
      id: 9,
      titulo: "Ciberseguridad en infraestructuras críticas de salud",
      autor: "Valeria Ríos Mendoza",
      coautores: "",
      tipo: "Tesis",
      categoria: "Posgrado",
      area: "Ciberseguridad",
      tecnologias: ["Kali Linux", "Wireshark", "Nmap"],
      tipoInvestigacion: "Descriptiva",
      carrera: "Ingeniería en Sistemas",
      linea: "Seguridad Informática",
      anio: 2023,
      estado: "Publicado",
      resumen:
        "Evaluación de vulnerabilidades y propuesta de framework de seguridad para hospitales de tercer nivel.",
      fecha: "2023-07-20",
      documento: "tesis_ciberseguridad.pdf",
    },
    {
      id: 10,
      titulo: "Chatbot educativo con modelos transformer",
      autor: "Alejandro Navarro Ruiz",
      coautores: "Diana Salazar",
      tipo: "Proyecto de Graduación",
      categoria: "Pregrado",
      area: "Inteligencia Artificial",
      tecnologias: ["Python", "Hugging Face", "FastAPI"],
      tipoInvestigacion: "Aplicada",
      carrera: "Ingeniería en Sistemas",
      linea: "Inteligencia Artificial",
      anio: 2024,
      estado: "Publicado",
      resumen:
        "Desarrollo de un asistente virtual educativo basado en modelos de lenguaje transformer para tutorías académicas.",
      fecha: "2024-06-01",
      documento: "proyecto_chatbot.pdf",
    },
    {
      id: 11,
      titulo: "Análisis de datos masivos en transporte público",
      autor: "Gabriela Ortiz Fonseca",
      coautores: "Raúl Delgado",
      tipo: "Artículo",
      categoria: "Investigación",
      area: "Ciencia de Datos",
      tecnologias: ["Python", "Apache Spark", "Tableau"],
      tipoInvestigacion: "Aplicada",
      carrera: "Ingeniería en Sistemas",
      linea: "Ciencia de Datos",
      anio: 2023,
      estado: "Publicado",
      resumen:
        "Procesamiento y análisis de grandes volúmenes de datos GPS para optimizar rutas de transporte público.",
      fecha: "2023-10-05",
      documento: "articulo_transporte.pdf",
    },
    {
      id: 12,
      titulo: "Realidad aumentada para enseñanza de anatomía",
      autor: "Sebastián Mora Vargas",
      coautores: "Paula Jiménez, Andrés León",
      tipo: "Proyecto de Graduación",
      categoria: "Pregrado",
      area: "Tecnología Educativa",
      tecnologias: ["Unity", "ARCore", "C#"],
      tipoInvestigacion: "Exploratoria",
      carrera: "Ingeniería en Sistemas",
      linea: "Tecnología Educativa",
      anio: 2024,
      estado: "En revisión",
      resumen:
        "Aplicación de realidad aumentada que permite visualizar estructuras anatómicas en 3D para estudiantes de medicina.",
      fecha: "2024-02-28",
      documento: "proyecto_ar_anatomia.pdf",
    },
    {
      id: 13,
      titulo: "Framework de testing automatizado para APIs REST",
      autor: "Natalia Campos Herrera",
      coautores: "",
      tipo: "Tesis",
      categoria: "Posgrado",
      area: "Ingeniería de Software",
      tecnologias: ["Java", "RestAssured", "JUnit"],
      tipoInvestigacion: "Aplicada",
      carrera: "Ingeniería en Sistemas",
      linea: "Desarrollo de Software",
      anio: 2023,
      estado: "Publicado",
      resumen:
        "Propuesta de un framework reutilizable para pruebas automatizadas de servicios web RESTful.",
      fecha: "2023-12-15",
      documento: "tesis_testing.pdf",
    },
    {
      id: 14,
      titulo: "Red neuronal para detección temprana de diabetes",
      autor: "Esteban Rojas Salazar",
      coautores: "María Elena Pardo",
      tipo: "Artículo",
      categoria: "Investigación",
      area: "Inteligencia Artificial",
      tecnologias: ["Python", "Keras", "Pandas"],
      tipoInvestigacion: "Básica",
      carrera: "Ingeniería en Sistemas",
      linea: "Inteligencia Artificial",
      anio: 2024,
      estado: "Publicado",
      resumen:
        "Modelo de red neuronal profunda para predicción temprana de diabetes tipo 2 basado en datos clínicos.",
      fecha: "2024-03-30",
      documento: "articulo_diabetes.pdf",
    },
    {
      id: 15,
      titulo: "Sistema ERP modular para PYMES costarricenses",
      autor: "Lucía Trejos Benavides",
      coautores: "Óscar Miranda, Carla Vega",
      tipo: "Proyecto de Graduación",
      categoria: "Pregrado",
      area: "Ingeniería de Software",
      tecnologias: ["Angular", ".NET", "SQL Server"],
      tipoInvestigacion: "Aplicada",
      carrera: "Administración de Empresas",
      linea: "Desarrollo de Software",
      anio: 2023,
      estado: "Publicado",
      resumen:
        "Diseño e implementación de un sistema ERP modular adaptado a las necesidades de pequeñas y medianas empresas.",
      fecha: "2023-06-20",
      documento: "proyecto_erp.pdf",
    },
    {
      id: 16,
      titulo: "Análisis forense digital en dispositivos IoT",
      autor: "Ricardo Blanco Montero",
      coautores: "",
      tipo: "Tesis",
      categoria: "Posgrado",
      area: "Ciberseguridad",
      tecnologias: ["Python", "Autopsy", "FTK Imager"],
      tipoInvestigacion: "Descriptiva",
      carrera: "Ingeniería en Sistemas",
      linea: "Seguridad Informática",
      anio: 2024,
      estado: "En revisión",
      resumen:
        "Metodología de análisis forense digital aplicada a dispositivos IoT comprometidos en entornos domésticos.",
      fecha: "2024-04-18",
      documento: "tesis_forense_iot.pdf",
    },
    {
      id: 17,
      titulo: "Gamificación en plataformas de aprendizaje de programación",
      autor: "Isabella Rojas Quesada",
      coautores: "Tomás Aguilar",
      tipo: "Artículo",
      categoria: "Investigación",
      area: "Tecnología Educativa",
      tecnologias: ["JavaScript", "React", "Node.js"],
      tipoInvestigacion: "Exploratoria",
      carrera: "Ingeniería en Sistemas",
      linea: "Tecnología Educativa",
      anio: 2023,
      estado: "Publicado",
      resumen:
        "Evaluación del impacto de mecánicas de gamificación en la motivación y retención de estudiantes de programación.",
      fecha: "2023-11-28",
      documento: "articulo_gamificacion.pdf",
    },
    {
      id: 18,
      titulo: "Microservicios con Kubernetes para e-commerce",
      autor: "Diego Herrera Solano",
      coautores: "Valeria Núñez",
      tipo: "Proyecto de Graduación",
      categoria: "Pregrado",
      area: "Ingeniería de Software",
      tecnologias: ["Go", "Kubernetes", "gRPC"],
      tipoInvestigacion: "Aplicada",
      carrera: "Ingeniería en Sistemas",
      linea: "Desarrollo de Software",
      anio: 2024,
      estado: "Publicado",
      resumen:
        "Migración de arquitectura monolítica a microservicios orquestados con Kubernetes para plataforma de comercio electrónico.",
      fecha: "2024-05-22",
      documento: "proyecto_k8s.pdf",
    },
    {
      id: 19,
      titulo: "Modelo predictivo de deserción estudiantil universitaria",
      autor: "Adriana Peña Castro",
      coautores: "Jorge Luis Mena",
      tipo: "Tesis",
      categoria: "Posgrado",
      area: "Ciencia de Datos",
      tecnologias: ["Python", "XGBoost", "SHAP"],
      tipoInvestigacion: "Aplicada",
      carrera: "Ingeniería en Sistemas",
      linea: "Ciencia de Datos",
      anio: 2023,
      estado: "Publicado",
      resumen:
        "Modelo de machine learning interpretable para predecir la deserción estudiantil en educación superior.",
      fecha: "2023-08-05",
      documento: "tesis_desercion.pdf",
    },
    {
      id: 20,
      titulo: "Sistema de videovigilancia inteligente con YOLO",
      autor: "Mateo Salazar Vargas",
      coautores: "Camila Rodríguez",
      tipo: "Artículo",
      categoria: "Investigación",
      area: "Inteligencia Artificial",
      tecnologias: ["Python", "YOLOv8", "OpenCV"],
      tipoInvestigacion: "Aplicada",
      carrera: "Ingeniería en Sistemas",
      linea: "Inteligencia Artificial",
      anio: 2024,
      estado: "Publicado",
      resumen:
        "Implementación de sistema de detección de objetos en tiempo real para videovigilancia urbana usando YOLOv8.",
      fecha: "2024-01-25",
      documento: "articulo_yolo.pdf",
    },
  ],
  usuarios: [
    {
      id: 1,
      nombre: "Admin Sistema",
      email: "admin@universidad.ac.cr",
      rol: "Administrador",
      estado: "Activo",
      fechaRegistro: "2023-01-15",
    },
    {
      id: 2,
      nombre: "Dr. Roberto García",
      email: "rgarcia@universidad.ac.cr",
      rol: "Docente",
      estado: "Activo",
      fechaRegistro: "2023-02-20",
    },
    {
      id: 3,
      nombre: "María Fernández",
      email: "mfernandez@universidad.ac.cr",
      rol: "Estudiante",
      estado: "Activo",
      fechaRegistro: "2023-03-10",
    },
    {
      id: 4,
      nombre: "Dr. Carlos Ramírez",
      email: "cramirez@universidad.ac.cr",
      rol: "Investigador",
      estado: "Activo",
      fechaRegistro: "2023-01-25",
    },
    {
      id: 5,
      nombre: "Ana Mora López",
      email: "amora@universidad.ac.cr",
      rol: "Docente",
      estado: "Inactivo",
      fechaRegistro: "2023-04-05",
    },
    {
      id: 6,
      nombre: "José Rodríguez",
      email: "jrodriguez@universidad.ac.cr",
      rol: "Estudiante",
      estado: "Activo",
      fechaRegistro: "2023-05-12",
    },
    {
      id: 7,
      nombre: "Laura Jiménez",
      email: "ljimenez@universidad.ac.cr",
      rol: "Investigador",
      estado: "Activo",
      fechaRegistro: "2023-06-18",
    },
    {
      id: 8,
      nombre: "Pedro Sánchez",
      email: "psanchez@universidad.ac.cr",
      rol: "Estudiante",
      estado: "Activo",
      fechaRegistro: "2023-07-22",
    },
  ],
  tiposProduccion: [
    {
      id: 1,
      nombre: "Tesis",
      descripcion: "Trabajo de investigación para optar por un grado académico",
    },
    {
      id: 2,
      nombre: "Artículo",
      descripcion: "Publicación en revista científica o académica",
    },
    {
      id: 3,
      nombre: "Proyecto de Graduación",
      descripcion: "Proyecto aplicado como requisito de graduación",
    },
    {
      id: 4,
      nombre: "Ponencia",
      descripcion: "Presentación en congreso o conferencia académica",
    },
    {
      id: 5,
      nombre: "Informe Técnico",
      descripcion: "Documento técnico resultado de investigación",
    },
  ],
  categorias: [
    {
      id: 1,
      nombre: "Pregrado",
      descripcion: "Producción de nivel licenciatura o bachillerato",
    },
    {
      id: 2,
      nombre: "Posgrado",
      descripcion: "Producción de nivel maestría o doctorado",
    },
    {
      id: 3,
      nombre: "Investigación",
      descripcion: "Producción resultado de proyectos de investigación",
    },
    {
      id: 4,
      nombre: "Extensión",
      descripcion:
        "Producción vinculada a proyectos de extensión universitaria",
    },
  ],
  areas: [
    {
      id: 1,
      nombre: "Ingeniería de Software",
      descripcion: "Desarrollo, diseño y gestión de sistemas de software",
    },
    {
      id: 2,
      nombre: "Inteligencia Artificial",
      descripcion: "Machine learning, NLP, visión por computadora",
    },
    {
      id: 3,
      nombre: "Ciberseguridad",
      descripcion: "Seguridad informática y protección de datos",
    },
    {
      id: 4,
      nombre: "Ciencia de Datos",
      descripcion: "Análisis, procesamiento y visualización de datos",
    },
    {
      id: 5,
      nombre: "Tecnología Educativa",
      descripcion: "Aplicación de tecnología en procesos educativos",
    },
    {
      id: 6,
      nombre: "Internet de las Cosas",
      descripcion: "Dispositivos conectados y sistemas embebidos",
    },
    {
      id: 7,
      nombre: "Tecnologías Emergentes",
      descripcion: "Blockchain, realidad aumentada, computación cuántica",
    },
  ],
  tecnologias: [
    {
      id: 1,
      nombre: "Python",
      descripcion: "Lenguaje de programación de propósito general",
    },
    {
      id: 2,
      nombre: "Java",
      descripcion: "Lenguaje de programación orientado a objetos",
    },
    {
      id: 3,
      nombre: "JavaScript",
      descripcion: "Lenguaje de programación web",
    },
    {
      id: 4,
      nombre: "React",
      descripcion: "Biblioteca de interfaz de usuario",
    },
    {
      id: 5,
      nombre: "Node.js",
      descripcion: "Entorno de ejecución JavaScript del lado del servidor",
    },
    {
      id: 6,
      nombre: "TensorFlow",
      descripcion: "Framework de aprendizaje automático",
    },
    { id: 7, nombre: "Docker", descripcion: "Plataforma de contenedores" },
    {
      id: 8,
      nombre: "Spring Boot",
      descripcion: "Framework de desarrollo Java",
    },
    { id: 9, nombre: "Angular", descripcion: "Framework de desarrollo web" },
    {
      id: 10,
      nombre: "PostgreSQL",
      descripcion: "Sistema de gestión de bases de datos relacional",
    },
  ],
  tiposInvestigacion: [
    {
      id: 1,
      nombre: "Básica",
      descripcion: "Investigación teórica que busca ampliar el conocimiento",
    },
    {
      id: 2,
      nombre: "Aplicada",
      descripcion: "Investigación orientada a resolver problemas prácticos",
    },
    {
      id: 3,
      nombre: "Exploratoria",
      descripcion: "Primer acercamiento a un tema poco estudiado",
    },
    {
      id: 4,
      nombre: "Descriptiva",
      descripcion: "Describe características y propiedades del fenómeno",
    },
    {
      id: 5,
      nombre: "Correlacional",
      descripcion: "Evalúa la relación entre dos o más variables",
    },
  ],
  carreras: [
    {
      id: 1,
      nombre: "Ingeniería en Sistemas",
      descripcion: "Formación en desarrollo y gestión de sistemas informáticos",
    },
    {
      id: 2,
      nombre: "Ingeniería en Computación",
      descripcion: "Formación en hardware, software y redes",
    },
    {
      id: 3,
      nombre: "Administración de Empresas",
      descripcion: "Formación en gestión y dirección empresarial",
    },
    {
      id: 4,
      nombre: "Ingeniería Industrial",
      descripcion: "Optimización de procesos productivos y de servicios",
    },
    {
      id: 5,
      nombre: "Diseño Gráfico",
      descripcion: "Comunicación visual y diseño de interfaces",
    },
  ],
  lineas: [
    {
      id: 1,
      nombre: "Desarrollo de Software",
      descripcion:
        "Metodologías, herramientas y prácticas de ingeniería de software",
    },
    {
      id: 2,
      nombre: "Inteligencia Artificial",
      descripcion: "Investigación en ML, deep learning y sistemas inteligentes",
    },
    {
      id: 3,
      nombre: "Seguridad Informática",
      descripcion: "Protección de sistemas, redes y datos",
    },
    {
      id: 4,
      nombre: "Ciencia de Datos",
      descripcion: "Big data, analítica y visualización",
    },
    {
      id: 5,
      nombre: "Tecnología Educativa",
      descripcion: "Innovación tecnológica en educación",
    },
    {
      id: 6,
      nombre: "IoT y Sistemas Embebidos",
      descripcion: "Dispositivos inteligentes y sistemas conectados",
    },
    {
      id: 7,
      nombre: "Tecnologías Emergentes",
      descripcion: "Blockchain, AR/VR, computación cuántica",
    },
    {
      id: 8,
      nombre: "Innovación Educativa",
      descripcion: "Nuevos modelos y estrategias pedagógicas",
    },
  ],
};

let currentRole = "Administrador";
let currentPage = 1;
const itemsPerPage = 5;

function setRole(role) {
  currentRole = role;
  if (typeof updateRoleUI === "function") updateRoleUI();
}

function canCreate() {
  return ["Administrador", "Docente", "Investigador"].includes(currentRole);
}

function canEdit() {
  return ["Administrador", "Docente"].includes(currentRole);
}

function canDelete() {
  return currentRole === "Administrador";
}

function canAdmin() {
  return currentRole === "Administrador";
}

function showAlert(message, type = "success") {
  const container = document.querySelector(".content-area");
  if (!container) return;
  const alert = document.createElement("div");
  alert.className = `alert alert-${type} alert-dismissible fade show alert-custom position-fixed`;
  alert.style.cssText =
    "top: 80px; right: 20px; z-index: 9999; min-width: 300px;";
  alert.innerHTML = `${message}<button type="button" class="btn-close" data-bs-dismiss="alert"></button>`;
  document.body.appendChild(alert);
  setTimeout(() => alert.remove(), 3500);
}

function renderPagination(totalItems, containerId, renderFunction) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  let html = '<nav><ul class="pagination pagination-custom mb-0">';
  html += `<li class="page-item ${currentPage === 1 ? "disabled" : ""}"><a class="page-link" href="#" onclick="changePage(${currentPage - 1}, '${renderFunction}'); return false;">&laquo;</a></li>`;
  for (let i = 1; i <= totalPages; i++) {
    html += `<li class="page-item ${i === currentPage ? "active" : ""}"><a class="page-link" href="#" onclick="changePage(${i}, '${renderFunction}'); return false;">${i}</a></li>`;
  }
  html += `<li class="page-item ${currentPage === totalPages ? "disabled" : ""}"><a class="page-link" href="#" onclick="changePage(${currentPage + 1}, '${renderFunction}'); return false;">&raquo;</a></li>`;
  html += "</ul></nav>";
  container.innerHTML = html;
}

function changePage(page, renderFunction) {
  currentPage = page;
  if (typeof window[renderFunction] === "function") window[renderFunction]();
}

function getStatusBadge(status) {
  const colors = {
    Publicado: "success",
    "En revisión": "warning",
    Borrador: "secondary",
    Rechazado: "danger",
  };
  return `<span class="badge bg-${colors[status] || "secondary"} badge-status">${status}</span>`;
}

function getActionButtons(type, id) {
  let html = "";
  if (type === "produccion") {
    html += `<a href="produccion-detalle.html?id=${id}" class="btn btn-sm btn-outline-primary me-1" title="Ver detalle"><i class="bi bi-eye"></i></a>`;
    if (canEdit())
      html += `<a href="produccion-form.html?id=${id}" class="btn btn-sm btn-outline-warning me-1" title="Editar"><i class="bi bi-pencil"></i></a>`;
    if (canDelete())
      html += `<button class="btn btn-sm btn-outline-danger" onclick="deleteProduccion(${id})" title="Eliminar"><i class="bi bi-trash"></i></button>`;
  } else {
    html += `<button class="btn btn-sm btn-outline-primary me-1" onclick="editItem('${type}', ${id})" title="Editar"><i class="bi bi-pencil"></i></button>`;
    if (canDelete())
      html += `<button class="btn btn-sm btn-outline-danger" onclick="deleteItem('${type}', ${id})" title="Eliminar"><i class="bi bi-trash"></i></button>`;
  }
  return html;
}

function deleteProduccion(id) {
  if (confirm("¿Está seguro de eliminar esta producción académica?")) {
    DB.produccion = DB.produccion.filter((p) => p.id !== id);
    showAlert("Producción académica eliminada correctamente.");
    if (typeof renderProduccionList === "function") renderProduccionList();
  }
}

function deleteItem(type, id) {
  if (confirm("¿Está seguro de eliminar este registro?")) {
    if (DB[type]) {
      DB[type] = DB[type].filter((item) => item.id !== id);
      showAlert("Registro eliminado correctamente.");
      if (
        typeof window[
          "render" + type.charAt(0).toUpperCase() + type.slice(1)
        ] === "function"
      ) {
        window["render" + type.charAt(0).toUpperCase() + type.slice(1)]();
      }
    }
  }
}

function editItem(type, id) {
  const item = DB[type]?.find((i) => i.id === id);
  if (!item) return;
  const modal = document.getElementById("editModal");
  if (!modal) return;
  const form = document.getElementById("editForm");
  if (!form) return;
  let fields = "";
  Object.keys(item).forEach((key) => {
    if (key === "id") return;
    fields += `<div class="mb-3"><label class="form-label">${key.charAt(0).toUpperCase() + key.slice(1)}</label><input type="text" class="form-control" name="${key}" value="${item[key]}"></div>`;
  });
  form.innerHTML =
    fields +
    `<input type="hidden" name="id" value="${id}"><input type="hidden" name="type" value="${type}">`;
  new bootstrap.Modal(modal).show();
}

function saveEdit() {
  const form = document.getElementById("editForm");
  const formData = new FormData(form);
  const type = formData.get("type");
  const id = parseInt(formData.get("id"));
  const item = DB[type]?.find((i) => i.id === id);
  if (!item) return;
  for (let [key, value] of formData.entries()) {
    if (key !== "id" && key !== "type") item[key] = value;
  }
  bootstrap.Modal.getInstance(document.getElementById("editModal")).hide();
  showAlert("Registro actualizado correctamente.");
  if (
    typeof window["render" + type.charAt(0).toUpperCase() + type.slice(1)] ===
    "function"
  ) {
    window["render" + type.charAt(0).toUpperCase() + type.slice(1)]();
  }
}

function initSidebar() {
  const toggle = document.querySelector(".sidebar-toggle");
  const sidebar = document.querySelector(".sidebar");
  if (toggle && sidebar) {
    toggle.addEventListener("click", () => sidebar.classList.toggle("show"));
  }
  document.addEventListener("click", (e) => {
    if (
      sidebar &&
      sidebar.classList.contains("show") &&
      !sidebar.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      sidebar.classList.remove("show");
    }
  });
}

function initRoleSelector() {
  const selector = document.getElementById("roleSelector");
  if (selector) {
    selector.value = currentRole;
    selector.addEventListener("change", (e) => setRole(e.target.value));
  }
}

function updateRoleUI() {
  document.querySelectorAll("[data-role]").forEach((el) => {
    const roles = el.getAttribute("data-role").split(",");
    el.style.display = roles.includes(currentRole) ? "" : "none";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initSidebar();
  initRoleSelector();
  updateRoleUI();
});
