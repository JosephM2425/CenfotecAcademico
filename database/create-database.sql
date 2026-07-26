IF DB_ID(N'CenfoAcademico') IS NULL
BEGIN
    CREATE DATABASE CenfoAcademico;
END
GO

USE CenfoAcademico;
GO

DROP TABLE IF EXISTS dbo.ProduccionTecnologias;
DROP TABLE IF EXISTS dbo.ProduccionCoautores;
DROP TABLE IF EXISTS dbo.Producciones;
DROP TABLE IF EXISTS dbo.Usuarios;
DROP TABLE IF EXISTS dbo.LineasInvestigacion;
DROP TABLE IF EXISTS dbo.Carreras;
DROP TABLE IF EXISTS dbo.TiposInvestigacion;
DROP TABLE IF EXISTS dbo.Tecnologias;
DROP TABLE IF EXISTS dbo.Areas;
DROP TABLE IF EXISTS dbo.Categorias;
DROP TABLE IF EXISTS dbo.TiposProduccion;
GO

CREATE TABLE dbo.TiposProduccion (
    Id          INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_TiposProduccion PRIMARY KEY,
    Nombre      NVARCHAR(100) NOT NULL,
    Descripcion NVARCHAR(400) NOT NULL,
    CONSTRAINT UQ_TiposProduccion_Nombre UNIQUE (Nombre)
);
GO

CREATE TABLE dbo.Categorias (
    Id          INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_Categorias PRIMARY KEY,
    Nombre      NVARCHAR(100) NOT NULL,
    Descripcion NVARCHAR(400) NOT NULL,
    CONSTRAINT UQ_Categorias_Nombre UNIQUE (Nombre)
);
GO

CREATE TABLE dbo.Areas (
    Id          INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_Areas PRIMARY KEY,
    Nombre      NVARCHAR(100) NOT NULL,
    Descripcion NVARCHAR(400) NOT NULL,
    CONSTRAINT UQ_Areas_Nombre UNIQUE (Nombre)
);
GO

CREATE TABLE dbo.Tecnologias (
    Id          INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_Tecnologias PRIMARY KEY,
    Nombre      NVARCHAR(100) NOT NULL,
    Descripcion NVARCHAR(400) NOT NULL,
    CONSTRAINT UQ_Tecnologias_Nombre UNIQUE (Nombre)
);
GO

CREATE TABLE dbo.TiposInvestigacion (
    Id          INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_TiposInvestigacion PRIMARY KEY,
    Nombre      NVARCHAR(100) NOT NULL,
    Descripcion NVARCHAR(400) NOT NULL,
    CONSTRAINT UQ_TiposInvestigacion_Nombre UNIQUE (Nombre)
);
GO

CREATE TABLE dbo.Carreras (
    Id          INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_Carreras PRIMARY KEY,
    Nombre      NVARCHAR(150) NOT NULL,
    Descripcion NVARCHAR(400) NOT NULL,
    CONSTRAINT UQ_Carreras_Nombre UNIQUE (Nombre)
);
GO

CREATE TABLE dbo.LineasInvestigacion (
    Id          INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_LineasInvestigacion PRIMARY KEY,
    Nombre      NVARCHAR(150) NOT NULL,
    Descripcion NVARCHAR(400) NOT NULL,
    CONSTRAINT UQ_LineasInvestigacion_Nombre UNIQUE (Nombre)
);
GO

CREATE TABLE dbo.Usuarios (
    Id             INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_Usuarios PRIMARY KEY,
    Nombre         NVARCHAR(150) NOT NULL,
    Email          NVARCHAR(150) NOT NULL,
    Password       NVARCHAR(255) NOT NULL,
    Rol            NVARCHAR(20) NOT NULL
        CONSTRAINT CK_Usuarios_Rol CHECK (Rol IN (N'Administrador', N'Docente', N'Investigador', N'Estudiante')),
    Estado         NVARCHAR(20) NOT NULL
        CONSTRAINT CK_Usuarios_Estado CHECK (Estado IN (N'Activo', N'Inactivo')),
    FechaRegistro  DATE NOT NULL CONSTRAINT DF_Usuarios_FechaRegistro DEFAULT (CAST(GETDATE() AS DATE)),
    CONSTRAINT UQ_Usuarios_Email UNIQUE (Email)
);
GO

CREATE TABLE dbo.Producciones (
    Id                  INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_Producciones PRIMARY KEY,
    Titulo              NVARCHAR(300) NOT NULL,
    Autor               NVARCHAR(150) NOT NULL,
    TipoId              INT NOT NULL CONSTRAINT FK_Producciones_Tipo REFERENCES dbo.TiposProduccion(Id),
    CategoriaId         INT NOT NULL CONSTRAINT FK_Producciones_Categoria REFERENCES dbo.Categorias(Id),
    AreaId              INT NOT NULL CONSTRAINT FK_Producciones_Area REFERENCES dbo.Areas(Id),
    TipoInvestigacionId INT NOT NULL CONSTRAINT FK_Producciones_TipoInvestigacion REFERENCES dbo.TiposInvestigacion(Id),
    CarreraId           INT NOT NULL CONSTRAINT FK_Producciones_Carrera REFERENCES dbo.Carreras(Id),
    LineaId             INT NOT NULL CONSTRAINT FK_Producciones_Linea REFERENCES dbo.LineasInvestigacion(Id),
    Anio                SMALLINT NOT NULL CONSTRAINT CK_Producciones_Anio CHECK (Anio BETWEEN 2000 AND 2100),
    Estado              NVARCHAR(20) NOT NULL
        CONSTRAINT CK_Producciones_Estado CHECK (Estado IN (N'Publicado', N'En revisión', N'Borrador', N'Rechazado')),
    Resumen             NVARCHAR(MAX) NOT NULL,
    Fecha               DATE NOT NULL CONSTRAINT DF_Producciones_Fecha DEFAULT (CAST(GETDATE() AS DATE)),
    Documento           NVARCHAR(260) NULL
);
GO

CREATE TABLE dbo.ProduccionTecnologias (
    ProduccionId INT NOT NULL CONSTRAINT FK_ProdTec_Produccion REFERENCES dbo.Producciones(Id) ON DELETE CASCADE,
    TecnologiaId INT NOT NULL CONSTRAINT FK_ProdTec_Tecnologia REFERENCES dbo.Tecnologias(Id),
    CONSTRAINT PK_ProduccionTecnologias PRIMARY KEY (ProduccionId, TecnologiaId)
);
GO

CREATE TABLE dbo.ProduccionCoautores (
    Id           INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_ProduccionCoautores PRIMARY KEY,
    ProduccionId INT NOT NULL CONSTRAINT FK_ProdCoaut_Produccion REFERENCES dbo.Producciones(Id) ON DELETE CASCADE,
    Coautor      NVARCHAR(150) NOT NULL
);
GO

CREATE INDEX IX_Producciones_Titulo ON dbo.Producciones(Titulo);
CREATE INDEX IX_Producciones_Autor ON dbo.Producciones(Autor);
CREATE INDEX IX_Producciones_Estado ON dbo.Producciones(Estado);
CREATE INDEX IX_Producciones_TipoId ON dbo.Producciones(TipoId);
CREATE INDEX IX_Producciones_AreaId ON dbo.Producciones(AreaId);
CREATE INDEX IX_ProduccionCoautores_ProduccionId ON dbo.ProduccionCoautores(ProduccionId);
GO

INSERT INTO dbo.TiposProduccion (Nombre, Descripcion) VALUES
(N'Tesis', N'Trabajo de investigación para optar por un grado académico'),
(N'Artículo', N'Publicación en revista científica o académica'),
(N'Proyecto de Graduación', N'Proyecto aplicado como requisito de graduación'),
(N'Ponencia', N'Presentación en congreso o conferencia académica'),
(N'Informe Técnico', N'Documento técnico resultado de investigación');
GO

INSERT INTO dbo.Categorias (Nombre, Descripcion) VALUES
(N'Pregrado', N'Producción de nivel licenciatura o bachillerato'),
(N'Posgrado', N'Producción de nivel maestría o doctorado'),
(N'Investigación', N'Producción resultado de proyectos de investigación'),
(N'Extensión', N'Producción vinculada a proyectos de extensión universitaria');
GO

INSERT INTO dbo.Areas (Nombre, Descripcion) VALUES
(N'Ingeniería de Software', N'Desarrollo, diseño y gestión de sistemas de software'),
(N'Inteligencia Artificial', N'Machine learning, NLP, visión por computadora'),
(N'Ciberseguridad', N'Seguridad informática y protección de datos'),
(N'Ciencia de Datos', N'Análisis, procesamiento y visualización de datos'),
(N'Tecnología Educativa', N'Aplicación de tecnología en procesos educativos'),
(N'Internet de las Cosas', N'Dispositivos conectados y sistemas embebidos'),
(N'Tecnologías Emergentes', N'Blockchain, realidad aumentada, computación cuántica');
GO

INSERT INTO dbo.Tecnologias (Nombre, Descripcion) VALUES
(N'Python', N'Lenguaje de programación de propósito general'),
(N'Java', N'Lenguaje de programación orientado a objetos'),
(N'JavaScript', N'Lenguaje de programación web'),
(N'React', N'Biblioteca de interfaz de usuario'),
(N'Node.js', N'Entorno de ejecución JavaScript del lado del servidor'),
(N'TensorFlow', N'Framework de aprendizaje automático'),
(N'Docker', N'Plataforma de contenedores'),
(N'Spring Boot', N'Framework de desarrollo Java'),
(N'Angular', N'Framework de desarrollo web'),
(N'PostgreSQL', N'Sistema de gestión de bases de datos relacional'),
(N'NLTK', N'Biblioteca de Python para procesamiento de lenguaje natural'),
(N'MongoDB', N'Base de datos NoSQL orientada a documentos'),
(N'Solidity', N'Lenguaje para contratos inteligentes en Ethereum'),
(N'Ethereum', N'Plataforma blockchain para contratos inteligentes'),
(N'Web3.js', N'Biblioteca JavaScript para interactuar con Ethereum'),
(N'Scikit-learn', N'Biblioteca de Python para machine learning'),
(N'Flutter', N'Framework de Google para apps móviles multiplataforma'),
(N'Firebase', N'Plataforma de desarrollo de aplicaciones de Google'),
(N'Arduino', N'Plataforma de hardware y software para prototipos electrónicos'),
(N'NumPy', N'Biblioteca de Python para cómputo numérico'),
(N'DEAP', N'Framework de Python para algoritmos evolutivos'),
(N'Collaborative Filtering', N'Técnica de sistemas de recomendación basada en similitud de usuarios'),
(N'Kali Linux', N'Distribución de Linux orientada a pruebas de penetración'),
(N'Wireshark', N'Analizador de protocolos de red'),
(N'Nmap', N'Herramienta de escaneo y auditoría de redes'),
(N'Hugging Face', N'Plataforma y bibliotecas de modelos de lenguaje'),
(N'FastAPI', N'Framework de Python para construir APIs'),
(N'Apache Spark', N'Motor de procesamiento distribuido de datos masivos'),
(N'Tableau', N'Herramienta de visualización y análisis de datos'),
(N'Unity', N'Motor de videojuegos y aplicaciones 3D/AR'),
(N'ARCore', N'Plataforma de Google para realidad aumentada'),
(N'C#', N'Lenguaje de programación orientado a objetos de Microsoft'),
(N'RestAssured', N'Biblioteca Java para pruebas de APIs REST'),
(N'JUnit', N'Framework de pruebas unitarias para Java'),
(N'Keras', N'API de alto nivel para redes neuronales'),
(N'Pandas', N'Biblioteca de Python para análisis de datos'),
(N'.NET', N'Plataforma de desarrollo de Microsoft'),
(N'SQL Server', N'Sistema de gestión de bases de datos relacional de Microsoft'),
(N'Autopsy', N'Herramienta de análisis forense digital'),
(N'FTK Imager', N'Herramienta de adquisición de evidencia forense digital'),
(N'Go', N'Lenguaje de programación compilado de Google'),
(N'Kubernetes', N'Plataforma de orquestación de contenedores'),
(N'gRPC', N'Framework de comunicación remota de alto rendimiento'),
(N'XGBoost', N'Biblioteca de gradient boosting para machine learning'),
(N'SHAP', N'Biblioteca para interpretar modelos de machine learning'),
(N'YOLOv8', N'Modelo de detección de objetos en tiempo real'),
(N'OpenCV', N'Biblioteca de visión por computadora');
GO

INSERT INTO dbo.TiposInvestigacion (Nombre, Descripcion) VALUES
(N'Básica', N'Investigación teórica que busca ampliar el conocimiento'),
(N'Aplicada', N'Investigación orientada a resolver problemas prácticos'),
(N'Exploratoria', N'Primer acercamiento a un tema poco estudiado'),
(N'Descriptiva', N'Describe características y propiedades del fenómeno'),
(N'Correlacional', N'Evalúa la relación entre dos o más variables');
GO

INSERT INTO dbo.Carreras (Nombre, Descripcion) VALUES
(N'Ingeniería en Sistemas', N'Formación en desarrollo y gestión de sistemas informáticos'),
(N'Ingeniería en Computación', N'Formación en hardware, software y redes'),
(N'Administración de Empresas', N'Formación en gestión y dirección empresarial'),
(N'Ingeniería Industrial', N'Optimización de procesos productivos y de servicios'),
(N'Diseño Gráfico', N'Comunicación visual y diseño de interfaces');
GO

INSERT INTO dbo.LineasInvestigacion (Nombre, Descripcion) VALUES
(N'Desarrollo de Software', N'Metodologías, herramientas y prácticas de ingeniería de software'),
(N'Inteligencia Artificial', N'Investigación en ML, deep learning y sistemas inteligentes'),
(N'Seguridad Informática', N'Protección de sistemas, redes y datos'),
(N'Ciencia de Datos', N'Big data, analítica y visualización'),
(N'Tecnología Educativa', N'Innovación tecnológica en educación'),
(N'IoT y Sistemas Embebidos', N'Dispositivos inteligentes y sistemas conectados'),
(N'Tecnologías Emergentes', N'Blockchain, AR/VR, computación cuántica'),
(N'Innovación Educativa', N'Nuevos modelos y estrategias pedagógicas');
GO

INSERT INTO dbo.Usuarios (Nombre, Email, Password, Rol, Estado, FechaRegistro) VALUES
(N'Admin Sistema', N'admin@ucenfotec.ac.cr', N'Cenfotec2024!', N'Administrador', N'Activo', '2023-01-15'),
(N'Dr. Roberto García', N'rgarcia@ucenfotec.ac.cr', N'Cenfotec2024!', N'Docente', N'Activo', '2023-02-20'),
(N'María Fernández', N'mfernandez@ucenfotec.ac.cr', N'Cenfotec2024!', N'Estudiante', N'Activo', '2023-03-10'),
(N'Dr. Carlos Ramírez', N'cramirez@ucenfotec.ac.cr', N'Cenfotec2024!', N'Investigador', N'Activo', '2023-01-25'),
(N'Ana Mora López', N'amora@ucenfotec.ac.cr', N'Cenfotec2024!', N'Docente', N'Inactivo', '2023-04-05'),
(N'José Rodríguez', N'jrodriguez@ucenfotec.ac.cr', N'Cenfotec2024!', N'Estudiante', N'Activo', '2023-05-12'),
(N'Laura Jiménez', N'ljimenez@ucenfotec.ac.cr', N'Cenfotec2024!', N'Investigador', N'Activo', '2023-06-18'),
(N'Pedro Sánchez', N'psanchez@ucenfotec.ac.cr', N'Cenfotec2024!', N'Estudiante', N'Activo', '2023-07-22');
GO

INSERT INTO dbo.Producciones
    (Titulo, Autor, TipoId, CategoriaId, AreaId, TipoInvestigacionId, CarreraId, LineaId, Anio, Estado, Resumen, Fecha, Documento)
VALUES
(N'Sistema de gestión hospitalaria basado en microservicios', N'María Fernández López',
 (SELECT Id FROM dbo.TiposProduccion WHERE Nombre = N'Tesis'),
 (SELECT Id FROM dbo.Categorias WHERE Nombre = N'Pregrado'),
 (SELECT Id FROM dbo.Areas WHERE Nombre = N'Ingeniería de Software'),
 (SELECT Id FROM dbo.TiposInvestigacion WHERE Nombre = N'Aplicada'),
 (SELECT Id FROM dbo.Carreras WHERE Nombre = N'Ingeniería en Sistemas'),
 (SELECT Id FROM dbo.LineasInvestigacion WHERE Nombre = N'Desarrollo de Software'),
 2024, N'Publicado', N'Propuesta de arquitectura de microservicios para un sistema hospitalario integral que mejora la escalabilidad y mantenibilidad.', '2024-03-15', N'tesis_hospitalaria.pdf'),

(N'Análisis de sentimientos en redes sociales usando NLP', N'José Rodríguez Vargas',
 (SELECT Id FROM dbo.TiposProduccion WHERE Nombre = N'Artículo'),
 (SELECT Id FROM dbo.Categorias WHERE Nombre = N'Posgrado'),
 (SELECT Id FROM dbo.Areas WHERE Nombre = N'Inteligencia Artificial'),
 (SELECT Id FROM dbo.TiposInvestigacion WHERE Nombre = N'Básica'),
 (SELECT Id FROM dbo.Carreras WHERE Nombre = N'Ingeniería en Sistemas'),
 (SELECT Id FROM dbo.LineasInvestigacion WHERE Nombre = N'Inteligencia Artificial'),
 2024, N'Publicado', N'Estudio comparativo de modelos de procesamiento de lenguaje natural para clasificación de sentimientos en Twitter.', '2024-02-20', N'articulo_nlp.pdf'),

(N'Plataforma e-learning adaptativa con gamificación', N'Andrea Castillo Solano',
 (SELECT Id FROM dbo.TiposProduccion WHERE Nombre = N'Proyecto de Graduación'),
 (SELECT Id FROM dbo.Categorias WHERE Nombre = N'Pregrado'),
 (SELECT Id FROM dbo.Areas WHERE Nombre = N'Tecnología Educativa'),
 (SELECT Id FROM dbo.TiposInvestigacion WHERE Nombre = N'Aplicada'),
 (SELECT Id FROM dbo.Carreras WHERE Nombre = N'Ingeniería en Sistemas'),
 (SELECT Id FROM dbo.LineasInvestigacion WHERE Nombre = N'Tecnología Educativa'),
 2023, N'Publicado', N'Desarrollo de plataforma educativa que adapta el contenido según el perfil de aprendizaje del estudiante.', '2023-11-10', N'proyecto_elearning.pdf'),

(N'Blockchain para trazabilidad de cadenas de suministro', N'Roberto Méndez Arias',
 (SELECT Id FROM dbo.TiposProduccion WHERE Nombre = N'Tesis'),
 (SELECT Id FROM dbo.Categorias WHERE Nombre = N'Posgrado'),
 (SELECT Id FROM dbo.Areas WHERE Nombre = N'Tecnologías Emergentes'),
 (SELECT Id FROM dbo.TiposInvestigacion WHERE Nombre = N'Exploratoria'),
 (SELECT Id FROM dbo.Carreras WHERE Nombre = N'Ingeniería en Sistemas'),
 (SELECT Id FROM dbo.LineasInvestigacion WHERE Nombre = N'Tecnologías Emergentes'),
 2024, N'En revisión', N'Implementación de un sistema basado en blockchain para garantizar la trazabilidad en cadenas de suministro agrícolas.', '2024-01-08', N'tesis_blockchain.pdf'),

(N'Impacto de la inteligencia artificial en la educación superior', N'Carmen Vargas Rojas',
 (SELECT Id FROM dbo.TiposProduccion WHERE Nombre = N'Artículo'),
 (SELECT Id FROM dbo.Categorias WHERE Nombre = N'Investigación'),
 (SELECT Id FROM dbo.Areas WHERE Nombre = N'Inteligencia Artificial'),
 (SELECT Id FROM dbo.TiposInvestigacion WHERE Nombre = N'Descriptiva'),
 (SELECT Id FROM dbo.Carreras WHERE Nombre = N'Administración de Empresas'),
 (SELECT Id FROM dbo.LineasInvestigacion WHERE Nombre = N'Innovación Educativa'),
 2023, N'Publicado', N'Análisis del impacto de herramientas de IA en el rendimiento académico de estudiantes universitarios.', '2023-09-25', N'articulo_ia_educacion.pdf'),

(N'App móvil para monitoreo de calidad del aire', N'Daniel Zúñiga Paredes',
 (SELECT Id FROM dbo.TiposProduccion WHERE Nombre = N'Proyecto de Graduación'),
 (SELECT Id FROM dbo.Categorias WHERE Nombre = N'Pregrado'),
 (SELECT Id FROM dbo.Areas WHERE Nombre = N'Internet de las Cosas'),
 (SELECT Id FROM dbo.TiposInvestigacion WHERE Nombre = N'Aplicada'),
 (SELECT Id FROM dbo.Carreras WHERE Nombre = N'Ingeniería en Sistemas'),
 (SELECT Id FROM dbo.LineasInvestigacion WHERE Nombre = N'IoT y Sistemas Embebidos'),
 2024, N'Publicado', N'Aplicación móvil que integra sensores IoT para monitorear la calidad del aire en tiempo real en zonas urbanas.', '2024-04-01', N'proyecto_aire.pdf'),

(N'Optimización de algoritmos genéticos para scheduling', N'Patricia León Campos',
 (SELECT Id FROM dbo.TiposProduccion WHERE Nombre = N'Tesis'),
 (SELECT Id FROM dbo.Categorias WHERE Nombre = N'Posgrado'),
 (SELECT Id FROM dbo.Areas WHERE Nombre = N'Inteligencia Artificial'),
 (SELECT Id FROM dbo.TiposInvestigacion WHERE Nombre = N'Básica'),
 (SELECT Id FROM dbo.Carreras WHERE Nombre = N'Ingeniería en Sistemas'),
 (SELECT Id FROM dbo.LineasInvestigacion WHERE Nombre = N'Inteligencia Artificial'),
 2023, N'Publicado', N'Propuesta de mejora en operadores de algoritmos genéticos aplicados a problemas de programación de tareas.', '2023-08-14', N'tesis_geneticos.pdf'),

(N'Sistema de recomendación para bibliotecas digitales', N'Fernando Aguilar Soto',
 (SELECT Id FROM dbo.TiposProduccion WHERE Nombre = N'Artículo'),
 (SELECT Id FROM dbo.Categorias WHERE Nombre = N'Investigación'),
 (SELECT Id FROM dbo.Areas WHERE Nombre = N'Ingeniería de Software'),
 (SELECT Id FROM dbo.TiposInvestigacion WHERE Nombre = N'Aplicada'),
 (SELECT Id FROM dbo.Carreras WHERE Nombre = N'Ingeniería en Sistemas'),
 (SELECT Id FROM dbo.LineasInvestigacion WHERE Nombre = N'Desarrollo de Software'),
 2024, N'En revisión', N'Modelo de filtrado colaborativo para mejorar la discoverability en repositorios académicos digitales.', '2024-05-12', N'articulo_recomendacion.pdf'),

(N'Ciberseguridad en infraestructuras críticas de salud', N'Valeria Ríos Mendoza',
 (SELECT Id FROM dbo.TiposProduccion WHERE Nombre = N'Tesis'),
 (SELECT Id FROM dbo.Categorias WHERE Nombre = N'Posgrado'),
 (SELECT Id FROM dbo.Areas WHERE Nombre = N'Ciberseguridad'),
 (SELECT Id FROM dbo.TiposInvestigacion WHERE Nombre = N'Descriptiva'),
 (SELECT Id FROM dbo.Carreras WHERE Nombre = N'Ingeniería en Sistemas'),
 (SELECT Id FROM dbo.LineasInvestigacion WHERE Nombre = N'Seguridad Informática'),
 2023, N'Publicado', N'Evaluación de vulnerabilidades y propuesta de framework de seguridad para hospitales de tercer nivel.', '2023-07-20', N'tesis_ciberseguridad.pdf'),

(N'Chatbot educativo con modelos transformer', N'Alejandro Navarro Ruiz',
 (SELECT Id FROM dbo.TiposProduccion WHERE Nombre = N'Proyecto de Graduación'),
 (SELECT Id FROM dbo.Categorias WHERE Nombre = N'Pregrado'),
 (SELECT Id FROM dbo.Areas WHERE Nombre = N'Inteligencia Artificial'),
 (SELECT Id FROM dbo.TiposInvestigacion WHERE Nombre = N'Aplicada'),
 (SELECT Id FROM dbo.Carreras WHERE Nombre = N'Ingeniería en Sistemas'),
 (SELECT Id FROM dbo.LineasInvestigacion WHERE Nombre = N'Inteligencia Artificial'),
 2024, N'Publicado', N'Desarrollo de un asistente virtual educativo basado en modelos de lenguaje transformer para tutorías académicas.', '2024-06-01', N'proyecto_chatbot.pdf'),

(N'Análisis de datos masivos en transporte público', N'Gabriela Ortiz Fonseca',
 (SELECT Id FROM dbo.TiposProduccion WHERE Nombre = N'Artículo'),
 (SELECT Id FROM dbo.Categorias WHERE Nombre = N'Investigación'),
 (SELECT Id FROM dbo.Areas WHERE Nombre = N'Ciencia de Datos'),
 (SELECT Id FROM dbo.TiposInvestigacion WHERE Nombre = N'Aplicada'),
 (SELECT Id FROM dbo.Carreras WHERE Nombre = N'Ingeniería en Sistemas'),
 (SELECT Id FROM dbo.LineasInvestigacion WHERE Nombre = N'Ciencia de Datos'),
 2023, N'Publicado', N'Procesamiento y análisis de grandes volúmenes de datos GPS para optimizar rutas de transporte público.', '2023-10-05', N'articulo_transporte.pdf'),

(N'Realidad aumentada para enseñanza de anatomía', N'Sebastián Mora Vargas',
 (SELECT Id FROM dbo.TiposProduccion WHERE Nombre = N'Proyecto de Graduación'),
 (SELECT Id FROM dbo.Categorias WHERE Nombre = N'Pregrado'),
 (SELECT Id FROM dbo.Areas WHERE Nombre = N'Tecnología Educativa'),
 (SELECT Id FROM dbo.TiposInvestigacion WHERE Nombre = N'Exploratoria'),
 (SELECT Id FROM dbo.Carreras WHERE Nombre = N'Ingeniería en Sistemas'),
 (SELECT Id FROM dbo.LineasInvestigacion WHERE Nombre = N'Tecnología Educativa'),
 2024, N'En revisión', N'Aplicación de realidad aumentada que permite visualizar estructuras anatómicas en 3D para estudiantes de medicina.', '2024-02-28', N'proyecto_ar_anatomia.pdf'),

(N'Framework de testing automatizado para APIs REST', N'Natalia Campos Herrera',
 (SELECT Id FROM dbo.TiposProduccion WHERE Nombre = N'Tesis'),
 (SELECT Id FROM dbo.Categorias WHERE Nombre = N'Posgrado'),
 (SELECT Id FROM dbo.Areas WHERE Nombre = N'Ingeniería de Software'),
 (SELECT Id FROM dbo.TiposInvestigacion WHERE Nombre = N'Aplicada'),
 (SELECT Id FROM dbo.Carreras WHERE Nombre = N'Ingeniería en Sistemas'),
 (SELECT Id FROM dbo.LineasInvestigacion WHERE Nombre = N'Desarrollo de Software'),
 2023, N'Publicado', N'Propuesta de un framework reutilizable para pruebas automatizadas de servicios web RESTful.', '2023-12-15', N'tesis_testing.pdf'),

(N'Red neuronal para detección temprana de diabetes', N'Esteban Rojas Salazar',
 (SELECT Id FROM dbo.TiposProduccion WHERE Nombre = N'Artículo'),
 (SELECT Id FROM dbo.Categorias WHERE Nombre = N'Investigación'),
 (SELECT Id FROM dbo.Areas WHERE Nombre = N'Inteligencia Artificial'),
 (SELECT Id FROM dbo.TiposInvestigacion WHERE Nombre = N'Básica'),
 (SELECT Id FROM dbo.Carreras WHERE Nombre = N'Ingeniería en Sistemas'),
 (SELECT Id FROM dbo.LineasInvestigacion WHERE Nombre = N'Inteligencia Artificial'),
 2024, N'Publicado', N'Modelo de red neuronal profunda para predicción temprana de diabetes tipo 2 basado en datos clínicos.', '2024-03-30', N'articulo_diabetes.pdf'),

(N'Sistema ERP modular para PYMES costarricenses', N'Lucía Trejos Benavides',
 (SELECT Id FROM dbo.TiposProduccion WHERE Nombre = N'Proyecto de Graduación'),
 (SELECT Id FROM dbo.Categorias WHERE Nombre = N'Pregrado'),
 (SELECT Id FROM dbo.Areas WHERE Nombre = N'Ingeniería de Software'),
 (SELECT Id FROM dbo.TiposInvestigacion WHERE Nombre = N'Aplicada'),
 (SELECT Id FROM dbo.Carreras WHERE Nombre = N'Administración de Empresas'),
 (SELECT Id FROM dbo.LineasInvestigacion WHERE Nombre = N'Desarrollo de Software'),
 2023, N'Publicado', N'Diseño e implementación de un sistema ERP modular adaptado a las necesidades de pequeñas y medianas empresas.', '2023-06-20', N'proyecto_erp.pdf'),

(N'Análisis forense digital en dispositivos IoT', N'Ricardo Blanco Montero',
 (SELECT Id FROM dbo.TiposProduccion WHERE Nombre = N'Tesis'),
 (SELECT Id FROM dbo.Categorias WHERE Nombre = N'Posgrado'),
 (SELECT Id FROM dbo.Areas WHERE Nombre = N'Ciberseguridad'),
 (SELECT Id FROM dbo.TiposInvestigacion WHERE Nombre = N'Descriptiva'),
 (SELECT Id FROM dbo.Carreras WHERE Nombre = N'Ingeniería en Sistemas'),
 (SELECT Id FROM dbo.LineasInvestigacion WHERE Nombre = N'Seguridad Informática'),
 2024, N'En revisión', N'Metodología de análisis forense digital aplicada a dispositivos IoT comprometidos en entornos domésticos.', '2024-04-18', N'tesis_forense_iot.pdf'),

(N'Gamificación en plataformas de aprendizaje de programación', N'Isabella Rojas Quesada',
 (SELECT Id FROM dbo.TiposProduccion WHERE Nombre = N'Artículo'),
 (SELECT Id FROM dbo.Categorias WHERE Nombre = N'Investigación'),
 (SELECT Id FROM dbo.Areas WHERE Nombre = N'Tecnología Educativa'),
 (SELECT Id FROM dbo.TiposInvestigacion WHERE Nombre = N'Exploratoria'),
 (SELECT Id FROM dbo.Carreras WHERE Nombre = N'Ingeniería en Sistemas'),
 (SELECT Id FROM dbo.LineasInvestigacion WHERE Nombre = N'Tecnología Educativa'),
 2023, N'Publicado', N'Evaluación del impacto de mecánicas de gamificación en la motivación y retención de estudiantes de programación.', '2023-11-28', N'articulo_gamificacion.pdf'),

(N'Microservicios con Kubernetes para e-commerce', N'Diego Herrera Solano',
 (SELECT Id FROM dbo.TiposProduccion WHERE Nombre = N'Proyecto de Graduación'),
 (SELECT Id FROM dbo.Categorias WHERE Nombre = N'Pregrado'),
 (SELECT Id FROM dbo.Areas WHERE Nombre = N'Ingeniería de Software'),
 (SELECT Id FROM dbo.TiposInvestigacion WHERE Nombre = N'Aplicada'),
 (SELECT Id FROM dbo.Carreras WHERE Nombre = N'Ingeniería en Sistemas'),
 (SELECT Id FROM dbo.LineasInvestigacion WHERE Nombre = N'Desarrollo de Software'),
 2024, N'Publicado', N'Migración de arquitectura monolítica a microservicios orquestados con Kubernetes para plataforma de comercio electrónico.', '2024-05-22', N'proyecto_k8s.pdf'),

(N'Modelo predictivo de deserción estudiantil universitaria', N'Adriana Peña Castro',
 (SELECT Id FROM dbo.TiposProduccion WHERE Nombre = N'Tesis'),
 (SELECT Id FROM dbo.Categorias WHERE Nombre = N'Posgrado'),
 (SELECT Id FROM dbo.Areas WHERE Nombre = N'Ciencia de Datos'),
 (SELECT Id FROM dbo.TiposInvestigacion WHERE Nombre = N'Aplicada'),
 (SELECT Id FROM dbo.Carreras WHERE Nombre = N'Ingeniería en Sistemas'),
 (SELECT Id FROM dbo.LineasInvestigacion WHERE Nombre = N'Ciencia de Datos'),
 2023, N'Publicado', N'Modelo de machine learning interpretable para predecir la deserción estudiantil en educación superior.', '2023-08-05', N'tesis_desercion.pdf'),

(N'Sistema de videovigilancia inteligente con YOLO', N'Mateo Salazar Vargas',
 (SELECT Id FROM dbo.TiposProduccion WHERE Nombre = N'Artículo'),
 (SELECT Id FROM dbo.Categorias WHERE Nombre = N'Investigación'),
 (SELECT Id FROM dbo.Areas WHERE Nombre = N'Inteligencia Artificial'),
 (SELECT Id FROM dbo.TiposInvestigacion WHERE Nombre = N'Aplicada'),
 (SELECT Id FROM dbo.Carreras WHERE Nombre = N'Ingeniería en Sistemas'),
 (SELECT Id FROM dbo.LineasInvestigacion WHERE Nombre = N'Inteligencia Artificial'),
 2024, N'Publicado', N'Implementación de sistema de detección de objetos en tiempo real para videovigilancia urbana usando YOLOv8.', '2024-01-25', N'articulo_yolo.pdf');
GO

INSERT INTO dbo.ProduccionTecnologias (ProduccionId, TecnologiaId)
SELECT p.Id, t.Id
FROM (VALUES
    (N'Sistema de gestión hospitalaria basado en microservicios', N'Java'),
    (N'Sistema de gestión hospitalaria basado en microservicios', N'Spring Boot'),
    (N'Sistema de gestión hospitalaria basado en microservicios', N'Docker'),

    (N'Análisis de sentimientos en redes sociales usando NLP', N'Python'),
    (N'Análisis de sentimientos en redes sociales usando NLP', N'TensorFlow'),
    (N'Análisis de sentimientos en redes sociales usando NLP', N'NLTK'),

    (N'Plataforma e-learning adaptativa con gamificación', N'React'),
    (N'Plataforma e-learning adaptativa con gamificación', N'Node.js'),
    (N'Plataforma e-learning adaptativa con gamificación', N'MongoDB'),

    (N'Blockchain para trazabilidad de cadenas de suministro', N'Solidity'),
    (N'Blockchain para trazabilidad de cadenas de suministro', N'Ethereum'),
    (N'Blockchain para trazabilidad de cadenas de suministro', N'Web3.js'),

    (N'Impacto de la inteligencia artificial en la educación superior', N'Python'),
    (N'Impacto de la inteligencia artificial en la educación superior', N'Scikit-learn'),

    (N'App móvil para monitoreo de calidad del aire', N'Flutter'),
    (N'App móvil para monitoreo de calidad del aire', N'Firebase'),
    (N'App móvil para monitoreo de calidad del aire', N'Arduino'),

    (N'Optimización de algoritmos genéticos para scheduling', N'Python'),
    (N'Optimización de algoritmos genéticos para scheduling', N'NumPy'),
    (N'Optimización de algoritmos genéticos para scheduling', N'DEAP'),

    (N'Sistema de recomendación para bibliotecas digitales', N'Python'),
    (N'Sistema de recomendación para bibliotecas digitales', N'Collaborative Filtering'),
    (N'Sistema de recomendación para bibliotecas digitales', N'PostgreSQL'),

    (N'Ciberseguridad en infraestructuras críticas de salud', N'Kali Linux'),
    (N'Ciberseguridad en infraestructuras críticas de salud', N'Wireshark'),
    (N'Ciberseguridad en infraestructuras críticas de salud', N'Nmap'),

    (N'Chatbot educativo con modelos transformer', N'Python'),
    (N'Chatbot educativo con modelos transformer', N'Hugging Face'),
    (N'Chatbot educativo con modelos transformer', N'FastAPI'),

    (N'Análisis de datos masivos en transporte público', N'Python'),
    (N'Análisis de datos masivos en transporte público', N'Apache Spark'),
    (N'Análisis de datos masivos en transporte público', N'Tableau'),

    (N'Realidad aumentada para enseñanza de anatomía', N'Unity'),
    (N'Realidad aumentada para enseñanza de anatomía', N'ARCore'),
    (N'Realidad aumentada para enseñanza de anatomía', N'C#'),

    (N'Framework de testing automatizado para APIs REST', N'Java'),
    (N'Framework de testing automatizado para APIs REST', N'RestAssured'),
    (N'Framework de testing automatizado para APIs REST', N'JUnit'),

    (N'Red neuronal para detección temprana de diabetes', N'Python'),
    (N'Red neuronal para detección temprana de diabetes', N'Keras'),
    (N'Red neuronal para detección temprana de diabetes', N'Pandas'),

    (N'Sistema ERP modular para PYMES costarricenses', N'Angular'),
    (N'Sistema ERP modular para PYMES costarricenses', N'.NET'),
    (N'Sistema ERP modular para PYMES costarricenses', N'SQL Server'),

    (N'Análisis forense digital en dispositivos IoT', N'Python'),
    (N'Análisis forense digital en dispositivos IoT', N'Autopsy'),
    (N'Análisis forense digital en dispositivos IoT', N'FTK Imager'),

    (N'Gamificación en plataformas de aprendizaje de programación', N'JavaScript'),
    (N'Gamificación en plataformas de aprendizaje de programación', N'React'),
    (N'Gamificación en plataformas de aprendizaje de programación', N'Node.js'),

    (N'Microservicios con Kubernetes para e-commerce', N'Go'),
    (N'Microservicios con Kubernetes para e-commerce', N'Kubernetes'),
    (N'Microservicios con Kubernetes para e-commerce', N'gRPC'),

    (N'Modelo predictivo de deserción estudiantil universitaria', N'Python'),
    (N'Modelo predictivo de deserción estudiantil universitaria', N'XGBoost'),
    (N'Modelo predictivo de deserción estudiantil universitaria', N'SHAP'),

    (N'Sistema de videovigilancia inteligente con YOLO', N'Python'),
    (N'Sistema de videovigilancia inteligente con YOLO', N'YOLOv8'),
    (N'Sistema de videovigilancia inteligente con YOLO', N'OpenCV')
) AS Mapa(Titulo, Tecnologia)
JOIN dbo.Producciones p ON p.Titulo = Mapa.Titulo
JOIN dbo.Tecnologias t ON t.Nombre = Mapa.Tecnologia;
GO

INSERT INTO dbo.ProduccionCoautores (ProduccionId, Coautor)
SELECT p.Id, m.Coautor
FROM (VALUES
    (N'Sistema de gestión hospitalaria basado en microservicios', N'Carlos Ramírez'),
    (N'Sistema de gestión hospitalaria basado en microservicios', N'Ana Mora'),
    (N'Análisis de sentimientos en redes sociales usando NLP', N'Laura Jiménez'),
    (N'Plataforma e-learning adaptativa con gamificación', N'Pedro Sánchez'),
    (N'Plataforma e-learning adaptativa con gamificación', N'María Torres'),
    (N'Impacto de la inteligencia artificial en la educación superior', N'Luis Herrera'),
    (N'App móvil para monitoreo de calidad del aire', N'Sofía Blanco'),
    (N'Optimización de algoritmos genéticos para scheduling', N'Miguel Ángel Reyes'),
    (N'Sistema de recomendación para bibliotecas digitales', N'Isabel Mora'),
    (N'Sistema de recomendación para bibliotecas digitales', N'Ricardo Peña'),
    (N'Chatbot educativo con modelos transformer', N'Diana Salazar'),
    (N'Análisis de datos masivos en transporte público', N'Raúl Delgado'),
    (N'Realidad aumentada para enseñanza de anatomía', N'Paula Jiménez'),
    (N'Realidad aumentada para enseñanza de anatomía', N'Andrés León'),
    (N'Red neuronal para detección temprana de diabetes', N'María Elena Pardo'),
    (N'Sistema ERP modular para PYMES costarricenses', N'Óscar Miranda'),
    (N'Sistema ERP modular para PYMES costarricenses', N'Carla Vega'),
    (N'Gamificación en plataformas de aprendizaje de programación', N'Tomás Aguilar'),
    (N'Microservicios con Kubernetes para e-commerce', N'Valeria Núñez'),
    (N'Modelo predictivo de deserción estudiantil universitaria', N'Jorge Luis Mena'),
    (N'Sistema de videovigilancia inteligente con YOLO', N'Camila Rodríguez')
) AS m(Titulo, Coautor)
JOIN dbo.Producciones p ON p.Titulo = m.Titulo;
GO
