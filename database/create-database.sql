USE CenfotecAcademico;

DROP TABLE IF EXISTS dbo.ProductionTechnologies;
DROP TABLE IF EXISTS dbo.ProductionCoauthors;
DROP TABLE IF EXISTS dbo.Documents;
DROP TABLE IF EXISTS dbo.Productions;
DROP TABLE IF EXISTS dbo.Users;
DROP TABLE IF EXISTS dbo.ResearchLines;
DROP TABLE IF EXISTS dbo.Majors;
DROP TABLE IF EXISTS dbo.ResearchTypes;
DROP TABLE IF EXISTS dbo.Technologies;
DROP TABLE IF EXISTS dbo.KnowledgeAreas;
DROP TABLE IF EXISTS dbo.Categories;
DROP TABLE IF EXISTS dbo.ProductionTypes;

CREATE TABLE dbo.ProductionTypes (
    Id          INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_ProductionTypes PRIMARY KEY,
    Name        NVARCHAR(100) NOT NULL,
    Description NVARCHAR(400) NOT NULL,
    CONSTRAINT UQ_ProductionTypes_Name UNIQUE (Name)
);

CREATE TABLE dbo.Categories (
    Id          INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_Categories PRIMARY KEY,
    Name        NVARCHAR(100) NOT NULL,
    Description NVARCHAR(400) NOT NULL,
    CONSTRAINT UQ_Categories_Name UNIQUE (Name)
);

CREATE TABLE dbo.KnowledgeAreas (
    Id          INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_KnowledgeAreas PRIMARY KEY,
    Name        NVARCHAR(100) NOT NULL,
    Description NVARCHAR(400) NOT NULL,
    CONSTRAINT UQ_KnowledgeAreas_Name UNIQUE (Name)
);

CREATE TABLE dbo.Technologies (
    Id          INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_Technologies PRIMARY KEY,
    Name        NVARCHAR(100) NOT NULL,
    Description NVARCHAR(400) NOT NULL,
    CONSTRAINT UQ_Technologies_Name UNIQUE (Name)
);

CREATE TABLE dbo.ResearchTypes (
    Id          INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_ResearchTypes PRIMARY KEY,
    Name        NVARCHAR(100) NOT NULL,
    Description NVARCHAR(400) NOT NULL,
    CONSTRAINT UQ_ResearchTypes_Name UNIQUE (Name)
);

CREATE TABLE dbo.Majors (
    Id          INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_Majors PRIMARY KEY,
    Name        NVARCHAR(150) NOT NULL,
    Description NVARCHAR(400) NOT NULL,
    CONSTRAINT UQ_Majors_Name UNIQUE (Name)
);

CREATE TABLE dbo.ResearchLines (
    Id          INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_ResearchLines PRIMARY KEY,
    Name        NVARCHAR(150) NOT NULL,
    Description NVARCHAR(400) NOT NULL,
    CONSTRAINT UQ_ResearchLines_Name UNIQUE (Name)
);

CREATE TABLE dbo.Users (
    Id           INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_Users PRIMARY KEY,
    Name         NVARCHAR(150) NOT NULL,
    Email        NVARCHAR(150) NOT NULL,
    Password     NVARCHAR(255) NOT NULL,
    Role         TINYINT NOT NULL CONSTRAINT CK_Users_Role CHECK (Role BETWEEN 1 AND 5),
    Status       TINYINT NOT NULL CONSTRAINT CK_Users_Status CHECK (Status BETWEEN 1 AND 2),
    RegisteredAt DATE NOT NULL CONSTRAINT DF_Users_RegisteredAt DEFAULT (CAST(GETDATE() AS DATE)),
    CONSTRAINT UQ_Users_Email UNIQUE (Email)
);

CREATE TABLE dbo.Productions (
    Id               INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_Productions PRIMARY KEY,
    Title            NVARCHAR(300) NOT NULL,
    Author           NVARCHAR(150) NOT NULL,
    OwnerId          INT NOT NULL CONSTRAINT FK_Productions_Owner REFERENCES dbo.Users(Id),
    ProductionTypeId INT NOT NULL CONSTRAINT FK_Productions_ProductionType REFERENCES dbo.ProductionTypes(Id),
    CategoryId       INT NOT NULL CONSTRAINT FK_Productions_Category REFERENCES dbo.Categories(Id),
    KnowledgeAreaId  INT NOT NULL CONSTRAINT FK_Productions_KnowledgeArea REFERENCES dbo.KnowledgeAreas(Id),
    ResearchTypeId   INT NOT NULL CONSTRAINT FK_Productions_ResearchType REFERENCES dbo.ResearchTypes(Id),
    MajorId          INT NOT NULL CONSTRAINT FK_Productions_Major REFERENCES dbo.Majors(Id),
    ResearchLineId   INT NOT NULL CONSTRAINT FK_Productions_ResearchLine REFERENCES dbo.ResearchLines(Id),
    Year             SMALLINT NOT NULL CONSTRAINT CK_Productions_Year CHECK (Year BETWEEN 2000 AND 2100),
    Status           TINYINT NOT NULL CONSTRAINT CK_Productions_Status CHECK (Status BETWEEN 1 AND 4),
    Summary          NVARCHAR(MAX) NOT NULL,
    CreatedAt        DATE NOT NULL CONSTRAINT DF_Productions_CreatedAt DEFAULT (CAST(GETDATE() AS DATE))
);

CREATE TABLE dbo.Documents (
    Id               INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_Documents PRIMARY KEY,
    ProductionId     INT NOT NULL CONSTRAINT FK_Documents_Production REFERENCES dbo.Productions(Id) ON DELETE CASCADE,
    OriginalFileName NVARCHAR(260) NOT NULL,
    StorageKey       NVARCHAR(400) NOT NULL,
    ContentType      NVARCHAR(100) NOT NULL,
    SizeBytes        BIGINT NULL,
    UploadedAt       DATETIME2 NOT NULL CONSTRAINT DF_Documents_UploadedAt DEFAULT (SYSDATETIME()),
    CONSTRAINT UQ_Documents_ProductionId UNIQUE (ProductionId)
);

CREATE TABLE dbo.ProductionTechnologies (
    ProductionId INT NOT NULL CONSTRAINT FK_ProductionTechnologies_Production REFERENCES dbo.Productions(Id) ON DELETE CASCADE,
    TechnologyId INT NOT NULL CONSTRAINT FK_ProductionTechnologies_Technology REFERENCES dbo.Technologies(Id),
    CONSTRAINT PK_ProductionTechnologies PRIMARY KEY (ProductionId, TechnologyId)
);

CREATE TABLE dbo.ProductionCoauthors (
    Id           INT IDENTITY(1,1) NOT NULL CONSTRAINT PK_ProductionCoauthors PRIMARY KEY,
    ProductionId INT NOT NULL CONSTRAINT FK_ProductionCoauthors_Production REFERENCES dbo.Productions(Id) ON DELETE CASCADE,
    CoauthorName NVARCHAR(150) NOT NULL
);

CREATE INDEX IX_Productions_Title ON dbo.Productions(Title);
CREATE INDEX IX_Productions_Author ON dbo.Productions(Author);
CREATE INDEX IX_Productions_Status ON dbo.Productions(Status);
CREATE INDEX IX_Productions_OwnerId ON dbo.Productions(OwnerId);
CREATE INDEX IX_Productions_ProductionTypeId ON dbo.Productions(ProductionTypeId);
CREATE INDEX IX_Productions_CategoryId ON dbo.Productions(CategoryId);
CREATE INDEX IX_Productions_KnowledgeAreaId ON dbo.Productions(KnowledgeAreaId);
CREATE INDEX IX_Productions_ResearchTypeId ON dbo.Productions(ResearchTypeId);
CREATE INDEX IX_Productions_MajorId ON dbo.Productions(MajorId);
CREATE INDEX IX_Productions_ResearchLineId ON dbo.Productions(ResearchLineId);
CREATE INDEX IX_Productions_Year ON dbo.Productions(Year);
CREATE INDEX IX_ProductionCoauthors_ProductionId ON dbo.ProductionCoauthors(ProductionId);

INSERT INTO dbo.ProductionTypes (Name, Description) VALUES
(N'Tesis', N'Trabajo de investigación para optar por un grado académico'),
(N'Artículo', N'Publicación en revista científica o académica'),
(N'Proyecto de Graduación', N'Proyecto aplicado como requisito de graduación'),
(N'Ponencia', N'Presentación en congreso o conferencia académica'),
(N'Informe Técnico', N'Documento técnico resultado de investigación');

INSERT INTO dbo.Categories (Name, Description) VALUES
(N'Pregrado', N'Producción de nivel licenciatura o bachillerato'),
(N'Posgrado', N'Producción de nivel maestría o doctorado'),
(N'Investigación', N'Producción resultado de proyectos de investigación'),
(N'Extensión', N'Producción vinculada a proyectos de extensión universitaria');

INSERT INTO dbo.KnowledgeAreas (Name, Description) VALUES
(N'Ingeniería de Software', N'Desarrollo, diseño y gestión de sistemas de software'),
(N'Inteligencia Artificial', N'Machine learning, NLP, visión por computadora'),
(N'Ciberseguridad', N'Seguridad informática y protección de datos'),
(N'Ciencia de Datos', N'Análisis, procesamiento y visualización de datos'),
(N'Tecnología Educativa', N'Aplicación de tecnología en procesos educativos'),
(N'Internet de las Cosas', N'Dispositivos conectados y sistemas embebidos'),
(N'Tecnologías Emergentes', N'Blockchain, realidad aumentada, computación cuántica');

INSERT INTO dbo.Technologies (Name, Description) VALUES
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

INSERT INTO dbo.ResearchTypes (Name, Description) VALUES
(N'Básica', N'Investigación teórica que busca ampliar el conocimiento'),
(N'Aplicada', N'Investigación orientada a resolver problemas prácticos'),
(N'Exploratoria', N'Primer acercamiento a un tema poco estudiado'),
(N'Descriptiva', N'Describe características y propiedades del fenómeno'),
(N'Correlacional', N'Evalúa la relación entre dos o más variables');

INSERT INTO dbo.Majors (Name, Description) VALUES
(N'Ingeniería en Sistemas', N'Formación en desarrollo y gestión de sistemas informáticos'),
(N'Ingeniería en Computación', N'Formación en hardware, software y redes'),
(N'Administración de Empresas', N'Formación en gestión y dirección empresarial'),
(N'Ingeniería Industrial', N'Optimización de procesos productivos y de servicios'),
(N'Diseño Gráfico', N'Comunicación visual y diseño de interfaces');

INSERT INTO dbo.ResearchLines (Name, Description) VALUES
(N'Desarrollo de Software', N'Metodologías, herramientas y prácticas de ingeniería de software'),
(N'Inteligencia Artificial', N'Investigación en ML, deep learning y sistemas inteligentes'),
(N'Seguridad Informática', N'Protección de sistemas, redes y datos'),
(N'Ciencia de Datos', N'Big data, analítica y visualización'),
(N'Tecnología Educativa', N'Innovación tecnológica en educación'),
(N'IoT y Sistemas Embebidos', N'Dispositivos inteligentes y sistemas conectados'),
(N'Tecnologías Emergentes', N'Blockchain, AR/VR, computación cuántica'),
(N'Innovación Educativa', N'Nuevos modelos y estrategias pedagógicas');

INSERT INTO dbo.Users (Name, Email, Password, Role, Status, RegisteredAt) VALUES
(N'Admin Sistema', N'admin@ucenfotec.ac.cr', N'Cenfotec2024!', 1, 1, '2023-01-15'),
(N'Dr. Roberto García', N'rgarcia@ucenfotec.ac.cr', N'Cenfotec2024!', 3, 1, '2023-02-20'),
(N'María Fernández', N'mfernandez@ucenfotec.ac.cr', N'Cenfotec2024!', 5, 1, '2023-03-10'),
(N'Dr. Carlos Ramírez', N'cramirez@ucenfotec.ac.cr', N'Cenfotec2024!', 4, 1, '2023-01-25'),
(N'Ana Mora López', N'amora@ucenfotec.ac.cr', N'Cenfotec2024!', 3, 2, '2023-04-05'),
(N'José Rodríguez', N'jrodriguez@ucenfotec.ac.cr', N'Cenfotec2024!', 5, 1, '2023-05-12'),
(N'Laura Jiménez', N'ljimenez@ucenfotec.ac.cr', N'Cenfotec2024!', 4, 1, '2023-06-18'),
(N'Pedro Sánchez', N'psanchez@ucenfotec.ac.cr', N'Cenfotec2024!', 5, 1, '2023-07-22'),
(N'Lic. Fabiola Chinchilla', N'fchinchilla@ucenfotec.ac.cr', N'Cenfotec2024!', 2, 1, '2023-02-01');

INSERT INTO dbo.Productions
    (Title, Author, OwnerId, ProductionTypeId, CategoryId, KnowledgeAreaId, ResearchTypeId, MajorId, ResearchLineId, Year, Status, Summary, CreatedAt)
VALUES
(N'Sistema de gestión hospitalaria basado en microservicios', N'María Fernández López',
 (SELECT Id FROM dbo.Users WHERE Email = N'mfernandez@ucenfotec.ac.cr'),
 (SELECT Id FROM dbo.ProductionTypes WHERE Name = N'Tesis'),
 (SELECT Id FROM dbo.Categories WHERE Name = N'Pregrado'),
 (SELECT Id FROM dbo.KnowledgeAreas WHERE Name = N'Ingeniería de Software'),
 (SELECT Id FROM dbo.ResearchTypes WHERE Name = N'Aplicada'),
 (SELECT Id FROM dbo.Majors WHERE Name = N'Ingeniería en Sistemas'),
 (SELECT Id FROM dbo.ResearchLines WHERE Name = N'Desarrollo de Software'),
 2024, 1, N'Propuesta de arquitectura de microservicios para un sistema hospitalario integral que mejora la escalabilidad y mantenibilidad.', '2024-03-15'),

(N'Análisis de sentimientos en redes sociales usando NLP', N'José Rodríguez Vargas',
 (SELECT Id FROM dbo.Users WHERE Email = N'jrodriguez@ucenfotec.ac.cr'),
 (SELECT Id FROM dbo.ProductionTypes WHERE Name = N'Artículo'),
 (SELECT Id FROM dbo.Categories WHERE Name = N'Posgrado'),
 (SELECT Id FROM dbo.KnowledgeAreas WHERE Name = N'Inteligencia Artificial'),
 (SELECT Id FROM dbo.ResearchTypes WHERE Name = N'Básica'),
 (SELECT Id FROM dbo.Majors WHERE Name = N'Ingeniería en Sistemas'),
 (SELECT Id FROM dbo.ResearchLines WHERE Name = N'Inteligencia Artificial'),
 2024, 1, N'Estudio comparativo de modelos de procesamiento de lenguaje natural para clasificación de sentimientos en Twitter.', '2024-02-20'),

(N'Plataforma e-learning adaptativa con gamificación', N'Andrea Castillo Solano',
 (SELECT Id FROM dbo.Users WHERE Email = N'cramirez@ucenfotec.ac.cr'),
 (SELECT Id FROM dbo.ProductionTypes WHERE Name = N'Proyecto de Graduación'),
 (SELECT Id FROM dbo.Categories WHERE Name = N'Pregrado'),
 (SELECT Id FROM dbo.KnowledgeAreas WHERE Name = N'Tecnología Educativa'),
 (SELECT Id FROM dbo.ResearchTypes WHERE Name = N'Aplicada'),
 (SELECT Id FROM dbo.Majors WHERE Name = N'Ingeniería en Sistemas'),
 (SELECT Id FROM dbo.ResearchLines WHERE Name = N'Tecnología Educativa'),
 2023, 1, N'Desarrollo de plataforma educativa que adapta el contenido según el perfil de aprendizaje del estudiante.', '2023-11-10'),

(N'Blockchain para trazabilidad de cadenas de suministro', N'Roberto Méndez Arias',
 (SELECT Id FROM dbo.Users WHERE Email = N'ljimenez@ucenfotec.ac.cr'),
 (SELECT Id FROM dbo.ProductionTypes WHERE Name = N'Tesis'),
 (SELECT Id FROM dbo.Categories WHERE Name = N'Posgrado'),
 (SELECT Id FROM dbo.KnowledgeAreas WHERE Name = N'Tecnologías Emergentes'),
 (SELECT Id FROM dbo.ResearchTypes WHERE Name = N'Exploratoria'),
 (SELECT Id FROM dbo.Majors WHERE Name = N'Ingeniería en Sistemas'),
 (SELECT Id FROM dbo.ResearchLines WHERE Name = N'Tecnologías Emergentes'),
 2024, 2, N'Implementación de un sistema basado en blockchain para garantizar la trazabilidad en cadenas de suministro agrícolas.', '2024-01-08'),

(N'Impacto de la inteligencia artificial en la educación superior', N'Carmen Vargas Rojas',
 (SELECT Id FROM dbo.Users WHERE Email = N'psanchez@ucenfotec.ac.cr'),
 (SELECT Id FROM dbo.ProductionTypes WHERE Name = N'Artículo'),
 (SELECT Id FROM dbo.Categories WHERE Name = N'Investigación'),
 (SELECT Id FROM dbo.KnowledgeAreas WHERE Name = N'Inteligencia Artificial'),
 (SELECT Id FROM dbo.ResearchTypes WHERE Name = N'Descriptiva'),
 (SELECT Id FROM dbo.Majors WHERE Name = N'Administración de Empresas'),
 (SELECT Id FROM dbo.ResearchLines WHERE Name = N'Innovación Educativa'),
 2023, 1, N'Análisis del impacto de herramientas de IA en el rendimiento académico de estudiantes universitarios.', '2023-09-25'),

(N'App móvil para monitoreo de calidad del aire', N'Daniel Zúñiga Paredes',
 (SELECT Id FROM dbo.Users WHERE Email = N'rgarcia@ucenfotec.ac.cr'),
 (SELECT Id FROM dbo.ProductionTypes WHERE Name = N'Proyecto de Graduación'),
 (SELECT Id FROM dbo.Categories WHERE Name = N'Pregrado'),
 (SELECT Id FROM dbo.KnowledgeAreas WHERE Name = N'Internet de las Cosas'),
 (SELECT Id FROM dbo.ResearchTypes WHERE Name = N'Aplicada'),
 (SELECT Id FROM dbo.Majors WHERE Name = N'Ingeniería en Sistemas'),
 (SELECT Id FROM dbo.ResearchLines WHERE Name = N'IoT y Sistemas Embebidos'),
 2024, 1, N'Aplicación móvil que integra sensores IoT para monitorear la calidad del aire en tiempo real en zonas urbanas.', '2024-04-01'),

(N'Optimización de algoritmos genéticos para scheduling', N'Patricia León Campos',
 (SELECT Id FROM dbo.Users WHERE Email = N'mfernandez@ucenfotec.ac.cr'),
 (SELECT Id FROM dbo.ProductionTypes WHERE Name = N'Tesis'),
 (SELECT Id FROM dbo.Categories WHERE Name = N'Posgrado'),
 (SELECT Id FROM dbo.KnowledgeAreas WHERE Name = N'Inteligencia Artificial'),
 (SELECT Id FROM dbo.ResearchTypes WHERE Name = N'Básica'),
 (SELECT Id FROM dbo.Majors WHERE Name = N'Ingeniería en Sistemas'),
 (SELECT Id FROM dbo.ResearchLines WHERE Name = N'Inteligencia Artificial'),
 2023, 1, N'Propuesta de mejora en operadores de algoritmos genéticos aplicados a problemas de programación de tareas.', '2023-08-14'),

(N'Sistema de recomendación para bibliotecas digitales', N'Fernando Aguilar Soto',
 (SELECT Id FROM dbo.Users WHERE Email = N'jrodriguez@ucenfotec.ac.cr'),
 (SELECT Id FROM dbo.ProductionTypes WHERE Name = N'Artículo'),
 (SELECT Id FROM dbo.Categories WHERE Name = N'Investigación'),
 (SELECT Id FROM dbo.KnowledgeAreas WHERE Name = N'Ingeniería de Software'),
 (SELECT Id FROM dbo.ResearchTypes WHERE Name = N'Aplicada'),
 (SELECT Id FROM dbo.Majors WHERE Name = N'Ingeniería en Sistemas'),
 (SELECT Id FROM dbo.ResearchLines WHERE Name = N'Desarrollo de Software'),
 2024, 2, N'Modelo de filtrado colaborativo para mejorar la discoverability en repositorios académicos digitales.', '2024-05-12'),

(N'Ciberseguridad en infraestructuras críticas de salud', N'Valeria Ríos Mendoza',
 (SELECT Id FROM dbo.Users WHERE Email = N'cramirez@ucenfotec.ac.cr'),
 (SELECT Id FROM dbo.ProductionTypes WHERE Name = N'Tesis'),
 (SELECT Id FROM dbo.Categories WHERE Name = N'Posgrado'),
 (SELECT Id FROM dbo.KnowledgeAreas WHERE Name = N'Ciberseguridad'),
 (SELECT Id FROM dbo.ResearchTypes WHERE Name = N'Descriptiva'),
 (SELECT Id FROM dbo.Majors WHERE Name = N'Ingeniería en Sistemas'),
 (SELECT Id FROM dbo.ResearchLines WHERE Name = N'Seguridad Informática'),
 2023, 1, N'Evaluación de vulnerabilidades y propuesta de framework de seguridad para hospitales de tercer nivel.', '2023-07-20'),

(N'Chatbot educativo con modelos transformer', N'Alejandro Navarro Ruiz',
 (SELECT Id FROM dbo.Users WHERE Email = N'ljimenez@ucenfotec.ac.cr'),
 (SELECT Id FROM dbo.ProductionTypes WHERE Name = N'Proyecto de Graduación'),
 (SELECT Id FROM dbo.Categories WHERE Name = N'Pregrado'),
 (SELECT Id FROM dbo.KnowledgeAreas WHERE Name = N'Inteligencia Artificial'),
 (SELECT Id FROM dbo.ResearchTypes WHERE Name = N'Aplicada'),
 (SELECT Id FROM dbo.Majors WHERE Name = N'Ingeniería en Sistemas'),
 (SELECT Id FROM dbo.ResearchLines WHERE Name = N'Inteligencia Artificial'),
 2024, 1, N'Desarrollo de un asistente virtual educativo basado en modelos de lenguaje transformer para tutorías académicas.', '2024-06-01'),

(N'Análisis de datos masivos en transporte público', N'Gabriela Ortiz Fonseca',
 (SELECT Id FROM dbo.Users WHERE Email = N'psanchez@ucenfotec.ac.cr'),
 (SELECT Id FROM dbo.ProductionTypes WHERE Name = N'Artículo'),
 (SELECT Id FROM dbo.Categories WHERE Name = N'Investigación'),
 (SELECT Id FROM dbo.KnowledgeAreas WHERE Name = N'Ciencia de Datos'),
 (SELECT Id FROM dbo.ResearchTypes WHERE Name = N'Aplicada'),
 (SELECT Id FROM dbo.Majors WHERE Name = N'Ingeniería en Sistemas'),
 (SELECT Id FROM dbo.ResearchLines WHERE Name = N'Ciencia de Datos'),
 2023, 1, N'Procesamiento y análisis de grandes volúmenes de datos GPS para optimizar rutas de transporte público.', '2023-10-05'),

(N'Realidad aumentada para enseñanza de anatomía', N'Sebastián Mora Vargas',
 (SELECT Id FROM dbo.Users WHERE Email = N'rgarcia@ucenfotec.ac.cr'),
 (SELECT Id FROM dbo.ProductionTypes WHERE Name = N'Proyecto de Graduación'),
 (SELECT Id FROM dbo.Categories WHERE Name = N'Pregrado'),
 (SELECT Id FROM dbo.KnowledgeAreas WHERE Name = N'Tecnología Educativa'),
 (SELECT Id FROM dbo.ResearchTypes WHERE Name = N'Exploratoria'),
 (SELECT Id FROM dbo.Majors WHERE Name = N'Ingeniería en Sistemas'),
 (SELECT Id FROM dbo.ResearchLines WHERE Name = N'Tecnología Educativa'),
 2024, 2, N'Aplicación de realidad aumentada que permite visualizar estructuras anatómicas en 3D para estudiantes de medicina.', '2024-02-28'),

(N'Framework de testing automatizado para APIs REST', N'Natalia Campos Herrera',
 (SELECT Id FROM dbo.Users WHERE Email = N'mfernandez@ucenfotec.ac.cr'),
 (SELECT Id FROM dbo.ProductionTypes WHERE Name = N'Tesis'),
 (SELECT Id FROM dbo.Categories WHERE Name = N'Posgrado'),
 (SELECT Id FROM dbo.KnowledgeAreas WHERE Name = N'Ingeniería de Software'),
 (SELECT Id FROM dbo.ResearchTypes WHERE Name = N'Aplicada'),
 (SELECT Id FROM dbo.Majors WHERE Name = N'Ingeniería en Sistemas'),
 (SELECT Id FROM dbo.ResearchLines WHERE Name = N'Desarrollo de Software'),
 2023, 1, N'Propuesta de un framework reutilizable para pruebas automatizadas de servicios web RESTful.', '2023-12-15'),

(N'Red neuronal para detección temprana de diabetes', N'Esteban Rojas Salazar',
 (SELECT Id FROM dbo.Users WHERE Email = N'jrodriguez@ucenfotec.ac.cr'),
 (SELECT Id FROM dbo.ProductionTypes WHERE Name = N'Artículo'),
 (SELECT Id FROM dbo.Categories WHERE Name = N'Investigación'),
 (SELECT Id FROM dbo.KnowledgeAreas WHERE Name = N'Inteligencia Artificial'),
 (SELECT Id FROM dbo.ResearchTypes WHERE Name = N'Básica'),
 (SELECT Id FROM dbo.Majors WHERE Name = N'Ingeniería en Sistemas'),
 (SELECT Id FROM dbo.ResearchLines WHERE Name = N'Inteligencia Artificial'),
 2024, 1, N'Modelo de red neuronal profunda para predicción temprana de diabetes tipo 2 basado en datos clínicos.', '2024-03-30'),

(N'Sistema ERP modular para PYMES costarricenses', N'Lucía Trejos Benavides',
 (SELECT Id FROM dbo.Users WHERE Email = N'cramirez@ucenfotec.ac.cr'),
 (SELECT Id FROM dbo.ProductionTypes WHERE Name = N'Proyecto de Graduación'),
 (SELECT Id FROM dbo.Categories WHERE Name = N'Pregrado'),
 (SELECT Id FROM dbo.KnowledgeAreas WHERE Name = N'Ingeniería de Software'),
 (SELECT Id FROM dbo.ResearchTypes WHERE Name = N'Aplicada'),
 (SELECT Id FROM dbo.Majors WHERE Name = N'Administración de Empresas'),
 (SELECT Id FROM dbo.ResearchLines WHERE Name = N'Desarrollo de Software'),
 2023, 1, N'Diseño e implementación de un sistema ERP modular adaptado a las necesidades de pequeñas y medianas empresas.', '2023-06-20'),

(N'Análisis forense digital en dispositivos IoT', N'Ricardo Blanco Montero',
 (SELECT Id FROM dbo.Users WHERE Email = N'ljimenez@ucenfotec.ac.cr'),
 (SELECT Id FROM dbo.ProductionTypes WHERE Name = N'Tesis'),
 (SELECT Id FROM dbo.Categories WHERE Name = N'Posgrado'),
 (SELECT Id FROM dbo.KnowledgeAreas WHERE Name = N'Ciberseguridad'),
 (SELECT Id FROM dbo.ResearchTypes WHERE Name = N'Descriptiva'),
 (SELECT Id FROM dbo.Majors WHERE Name = N'Ingeniería en Sistemas'),
 (SELECT Id FROM dbo.ResearchLines WHERE Name = N'Seguridad Informática'),
 2024, 2, N'Metodología de análisis forense digital aplicada a dispositivos IoT comprometidos en entornos domésticos.', '2024-04-18'),

(N'Gamificación en plataformas de aprendizaje de programación', N'Isabella Rojas Quesada',
 (SELECT Id FROM dbo.Users WHERE Email = N'psanchez@ucenfotec.ac.cr'),
 (SELECT Id FROM dbo.ProductionTypes WHERE Name = N'Artículo'),
 (SELECT Id FROM dbo.Categories WHERE Name = N'Investigación'),
 (SELECT Id FROM dbo.KnowledgeAreas WHERE Name = N'Tecnología Educativa'),
 (SELECT Id FROM dbo.ResearchTypes WHERE Name = N'Exploratoria'),
 (SELECT Id FROM dbo.Majors WHERE Name = N'Ingeniería en Sistemas'),
 (SELECT Id FROM dbo.ResearchLines WHERE Name = N'Tecnología Educativa'),
 2023, 1, N'Evaluación del impacto de mecánicas de gamificación en la motivación y retención de estudiantes de programación.', '2023-11-28'),

(N'Microservicios con Kubernetes para e-commerce', N'Diego Herrera Solano',
 (SELECT Id FROM dbo.Users WHERE Email = N'rgarcia@ucenfotec.ac.cr'),
 (SELECT Id FROM dbo.ProductionTypes WHERE Name = N'Proyecto de Graduación'),
 (SELECT Id FROM dbo.Categories WHERE Name = N'Pregrado'),
 (SELECT Id FROM dbo.KnowledgeAreas WHERE Name = N'Ingeniería de Software'),
 (SELECT Id FROM dbo.ResearchTypes WHERE Name = N'Aplicada'),
 (SELECT Id FROM dbo.Majors WHERE Name = N'Ingeniería en Sistemas'),
 (SELECT Id FROM dbo.ResearchLines WHERE Name = N'Desarrollo de Software'),
 2024, 1, N'Migración de arquitectura monolítica a microservicios orquestados con Kubernetes para plataforma de comercio electrónico.', '2024-05-22'),

(N'Modelo predictivo de deserción estudiantil universitaria', N'Adriana Peña Castro',
 (SELECT Id FROM dbo.Users WHERE Email = N'mfernandez@ucenfotec.ac.cr'),
 (SELECT Id FROM dbo.ProductionTypes WHERE Name = N'Tesis'),
 (SELECT Id FROM dbo.Categories WHERE Name = N'Posgrado'),
 (SELECT Id FROM dbo.KnowledgeAreas WHERE Name = N'Ciencia de Datos'),
 (SELECT Id FROM dbo.ResearchTypes WHERE Name = N'Aplicada'),
 (SELECT Id FROM dbo.Majors WHERE Name = N'Ingeniería en Sistemas'),
 (SELECT Id FROM dbo.ResearchLines WHERE Name = N'Ciencia de Datos'),
 2023, 1, N'Modelo de machine learning interpretable para predecir la deserción estudiantil en educación superior.', '2023-08-05'),

(N'Sistema de videovigilancia inteligente con YOLO', N'Mateo Salazar Vargas',
 (SELECT Id FROM dbo.Users WHERE Email = N'jrodriguez@ucenfotec.ac.cr'),
 (SELECT Id FROM dbo.ProductionTypes WHERE Name = N'Artículo'),
 (SELECT Id FROM dbo.Categories WHERE Name = N'Investigación'),
 (SELECT Id FROM dbo.KnowledgeAreas WHERE Name = N'Inteligencia Artificial'),
 (SELECT Id FROM dbo.ResearchTypes WHERE Name = N'Aplicada'),
 (SELECT Id FROM dbo.Majors WHERE Name = N'Ingeniería en Sistemas'),
 (SELECT Id FROM dbo.ResearchLines WHERE Name = N'Inteligencia Artificial'),
 2024, 1, N'Implementación de sistema de detección de objetos en tiempo real para videovigilancia urbana usando YOLOv8.', '2024-01-25');

INSERT INTO dbo.ProductionTechnologies (ProductionId, TechnologyId)
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
) AS Map(Title, Technology)
JOIN dbo.Productions p ON p.Title = Map.Title
JOIN dbo.Technologies t ON t.Name = Map.Technology;

INSERT INTO dbo.ProductionCoauthors (ProductionId, CoauthorName)
SELECT p.Id, m.CoauthorName
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
) AS m(Title, CoauthorName)
JOIN dbo.Productions p ON p.Title = m.Title;

INSERT INTO dbo.Documents (ProductionId, OriginalFileName, StorageKey, ContentType, UploadedAt)
SELECT p.Id, m.OriginalFileName, CONCAT(N'productions/', m.OriginalFileName), N'application/pdf', p.CreatedAt
FROM (VALUES
    (N'Sistema de gestión hospitalaria basado en microservicios', N'tesis_hospitalaria.pdf'),
    (N'Análisis de sentimientos en redes sociales usando NLP', N'articulo_nlp.pdf'),
    (N'Plataforma e-learning adaptativa con gamificación', N'proyecto_elearning.pdf'),
    (N'Blockchain para trazabilidad de cadenas de suministro', N'tesis_blockchain.pdf'),
    (N'Impacto de la inteligencia artificial en la educación superior', N'articulo_ia_educacion.pdf'),
    (N'App móvil para monitoreo de calidad del aire', N'proyecto_aire.pdf'),
    (N'Optimización de algoritmos genéticos para scheduling', N'tesis_geneticos.pdf'),
    (N'Sistema de recomendación para bibliotecas digitales', N'articulo_recomendacion.pdf'),
    (N'Ciberseguridad en infraestructuras críticas de salud', N'tesis_ciberseguridad.pdf'),
    (N'Chatbot educativo con modelos transformer', N'proyecto_chatbot.pdf'),
    (N'Análisis de datos masivos en transporte público', N'articulo_transporte.pdf'),
    (N'Realidad aumentada para enseñanza de anatomía', N'proyecto_ar_anatomia.pdf'),
    (N'Framework de testing automatizado para APIs REST', N'tesis_testing.pdf'),
    (N'Red neuronal para detección temprana de diabetes', N'articulo_diabetes.pdf'),
    (N'Sistema ERP modular para PYMES costarricenses', N'proyecto_erp.pdf'),
    (N'Análisis forense digital en dispositivos IoT', N'tesis_forense_iot.pdf'),
    (N'Gamificación en plataformas de aprendizaje de programación', N'articulo_gamificacion.pdf'),
    (N'Microservicios con Kubernetes para e-commerce', N'proyecto_k8s.pdf'),
    (N'Modelo predictivo de deserción estudiantil universitaria', N'tesis_desercion.pdf'),
    (N'Sistema de videovigilancia inteligente con YOLO', N'articulo_yolo.pdf')
) AS m(Title, OriginalFileName)
JOIN dbo.Productions p ON p.Title = m.Title;
