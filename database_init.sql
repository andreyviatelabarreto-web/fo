-- Crear base de datos
CREATE DATABASE IF NOT EXISTS certificaciones_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE certificaciones_db;

-- Tabla de categorías de certificaciones
CREATE TABLE certification_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de usuarios
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    country VARCHAR(100),
    city VARCHAR(100),
    address TEXT,
    role ENUM('CUSTOMER', 'INSTRUCTOR', 'ADMIN') DEFAULT 'CUSTOMER',
    email_verified BOOLEAN DEFAULT FALSE,
    email_verification_token VARCHAR(255),
    password_reset_token VARCHAR(255),
    password_reset_expires TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_active (is_active)
);

-- Tabla de certificaciones
CREATE TABLE certifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    detailed_description LONGTEXT,
    price DECIMAL(10,2) NOT NULL,
    duration_hours INT NOT NULL,
    difficulty_level ENUM('BEGINNER', 'INTERMEDIATE', 'ADVANCED') DEFAULT 'BEGINNER',
    language VARCHAR(10) DEFAULT 'es',
    certificate_type ENUM('COMPLETION', 'ACHIEVEMENT', 'PROFESSIONAL') DEFAULT 'COMPLETION',
    image_url VARCHAR(500),
    syllabus_url VARCHAR(500),
    prerequisites TEXT,
    learning_objectives TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES certification_categories(id) ON DELETE SET NULL,
    INDEX idx_category (category_id),
    INDEX idx_active (is_active),
    INDEX idx_featured (featured),
    INDEX idx_difficulty (difficulty_level)
);

-- Tabla de instructores
CREATE TABLE instructors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    bio TEXT,
    specializations TEXT,
    experience_years INT DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0.00,
    total_students INT DEFAULT 0,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_verified (is_verified)
);

-- Tabla de inscripciones
CREATE TABLE enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    certification_id INT NOT NULL,
    enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completion_date TIMESTAMP NULL,
    progress_percentage DECIMAL(5,2) DEFAULT 0.00,
    status ENUM('ENROLLED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED') DEFAULT 'ENROLLED',
    certificate_issued BOOLEAN DEFAULT FALSE,
    certificate_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (certification_id) REFERENCES certifications(id) ON DELETE CASCADE,
    UNIQUE KEY unique_enrollment (user_id, certification_id),
    INDEX idx_user (user_id),
    INDEX idx_certification (certification_id),
    INDEX idx_status (status)
);

-- Tabla de pedidos
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    status ENUM('PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED', 'REFUNDED') DEFAULT 'PENDING',
    payment_method VARCHAR(50),
    payment_status ENUM('PENDING', 'PAID', 'FAILED', 'REFUNDED') DEFAULT 'PENDING',
    payment_reference VARCHAR(255),
    billing_address TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_status (status),
    INDEX idx_payment_status (payment_status),
    INDEX idx_order_number (order_number)
);

-- Tabla de items de pedidos
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    certification_id INT NOT NULL,
    quantity INT DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (certification_id) REFERENCES certifications(id) ON DELETE CASCADE,
    INDEX idx_order (order_id),
    INDEX idx_certification (certification_id)
);

-- Tabla de citas
CREATE TABLE appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    instructor_id INT,
    certification_id INT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    duration_minutes INT DEFAULT 60,
    type ENUM('CONSULTATION', 'TUTORING', 'EXAM', 'ORIENTATION') DEFAULT 'CONSULTATION',
    status ENUM('SCHEDULED', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'NO_SHOW') DEFAULT 'SCHEDULED',
    meeting_url VARCHAR(500),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (instructor_id) REFERENCES instructors(id) ON DELETE SET NULL,
    FOREIGN KEY (certification_id) REFERENCES certifications(id) ON DELETE SET NULL,
    INDEX idx_user (user_id),
    INDEX idx_instructor (instructor_id),
    INDEX idx_certification (certification_id),
    INDEX idx_date (appointment_date),
    INDEX idx_status (status)
);

-- Tabla de evaluaciones y reseñas
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    certification_id INT NOT NULL,
    instructor_id INT,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    comment TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    is_public BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (certification_id) REFERENCES certifications(id) ON DELETE CASCADE,
    FOREIGN KEY (instructor_id) REFERENCES instructors(id) ON DELETE SET NULL,
    UNIQUE KEY unique_review (user_id, certification_id),
    INDEX idx_user (user_id),
    INDEX idx_certification (certification_id),
    INDEX idx_instructor (instructor_id),
    INDEX idx_rating (rating)
);

-- Insertar categorías de ejemplo
INSERT INTO certification_categories (name, description, icon) VALUES
('Tecnología', 'Certificaciones en desarrollo web, programación, ciberseguridad y más', 'fas fa-laptop-code'),
('Negocios', 'Gestión de proyectos, marketing, administración y emprendimiento', 'fas fa-briefcase'),
('Idiomas', 'Certificaciones en inglés, español y otros idiomas para el ámbito profesional', 'fas fa-language'),
('Salud', 'Certificaciones médicas, enfermería y ciencias de la salud', 'fas fa-heartbeat'),
('Educación', 'Pedagogía, didáctica y metodologías de enseñanza', 'fas fa-graduation-cap'),
('Diseño', 'Diseño gráfico, UX/UI, diseño web y multimedia', 'fas fa-palette');

-- Insertar certificaciones de ejemplo
INSERT INTO certifications (category_id, title, description, detailed_description, price, duration_hours, difficulty_level, prerequisites, learning_objectives, featured) VALUES
(1, 'Certificación en Desarrollo Web Full Stack', 
 'Aprende las tecnologías más demandadas del mercado incluyendo React, Node.js, y bases de datos.',
 'Este curso completo te llevará desde los fundamentos del desarrollo web hasta convertirte en un desarrollador full stack competente. Aprenderás HTML, CSS, JavaScript, React, Node.js, Express, MongoDB y mucho más.',
 299.00, 40, 'INTERMEDIATE',
 'Conocimientos básicos de programación, Familiaridad con HTML y CSS, Acceso a una computadora con internet',
 'Dominar HTML5, CSS3 y JavaScript moderno, Crear aplicaciones web con React, Desarrollar APIs REST con Node.js y Express, Trabajar con bases de datos MongoDB, Implementar autenticación y autorización, Desplegar aplicaciones en la nube',
 TRUE),

(2, 'Gestión de Proyectos PMP', 
 'Conviértete en un líder de proyectos certificado con metodologías reconocidas mundialmente.',
 'Prepárate para el examen PMP con nuestro curso completo que cubre todas las áreas de conocimiento del PMBOK. Aprenderás metodologías ágiles, gestión de riesgos, comunicación efectiva y liderazgo de equipos.',
 450.00, 60, 'ADVANCED',
 'Experiencia previa en gestión de proyectos, Conocimientos básicos de administración, Título universitario o experiencia equivalente',
 'Dominar el marco de trabajo del PMBOK, Aplicar metodologías ágiles y tradicionales, Gestionar riesgos y stakeholders, Liderar equipos multidisciplinarios, Prepararse para el examen PMP oficial',
 TRUE),

(3, 'Inglés de Negocios Avanzado', 
 'Domina el inglés profesional para el mundo empresarial y mejora tus oportunidades.',
 'Desarrolla habilidades avanzadas de comunicación en inglés para el entorno empresarial. Incluye presentaciones, negociaciones, escritura de reportes y comunicación intercultural.',
 199.00, 30, 'INTERMEDIATE',
 'Nivel intermedio de inglés, Experiencia laboral básica, Acceso a materiales de audio y video',
 'Comunicarse efectivamente en reuniones de negocios, Realizar presentaciones profesionales en inglés, Redactar emails y reportes empresariales, Negociar y cerrar acuerdos, Entender diferencias culturales en los negocios',
 FALSE),

(1, 'Certificación en Ciberseguridad', 
 'Aprende a proteger sistemas y datos con las mejores prácticas de seguridad informática.',
 'Curso integral de ciberseguridad que cubre desde conceptos básicos hasta técnicas avanzadas de protección. Incluye ethical hacking, análisis de vulnerabilidades y respuesta a incidentes.',
 399.00, 50, 'ADVANCED',
 'Conocimientos de redes y sistemas operativos, Experiencia básica en IT, Comprensión de conceptos de programación',
 'Identificar y mitigar vulnerabilidades, Implementar políticas de seguridad, Realizar auditorías de seguridad, Responder a incidentes de ciberseguridad, Usar herramientas de ethical hacking',
 FALSE),

(2, 'Marketing Digital y Redes Sociales', 
 'Domina las estrategias de marketing digital para hacer crecer cualquier negocio.',
 'Aprende las últimas tendencias en marketing digital, desde SEO y SEM hasta marketing en redes sociales y email marketing. Incluye herramientas prácticas y casos de estudio reales.',
 249.00, 35, 'BEGINNER',
 'Conocimientos básicos de marketing, Familiaridad con redes sociales, Acceso a internet y computadora',
 'Crear estrategias de marketing digital efectivas, Gestionar campañas en redes sociales, Optimizar sitios web para SEO, Analizar métricas y ROI, Desarrollar contenido atractivo',
 FALSE),

(4, 'Certificación en Enfermería', 
 'Actualiza tus conocimientos en enfermería con las últimas prácticas y protocolos.',
 'Programa de actualización profesional para enfermeros que cubre nuevos protocolos, tecnologías médicas y mejores prácticas en el cuidado del paciente.',
 350.00, 45, 'INTERMEDIATE',
 'Título en enfermería, Experiencia clínica mínima de 1 año, Licencia profesional vigente',
 'Aplicar nuevos protocolos de atención, Usar tecnologías médicas modernas, Mejorar la comunicación con pacientes, Implementar medidas de seguridad, Desarrollar planes de cuidado integral',
 FALSE);

-- Insertar usuario administrador de ejemplo
INSERT INTO users (email, password_hash, first_name, last_name, role, email_verified, is_active) VALUES
('admin@certificaciones.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrador', 'Sistema', 'ADMIN', TRUE, TRUE);

-- Insertar algunos usuarios de ejemplo
INSERT INTO users (email, password_hash, first_name, last_name, phone, country, city, role, email_verified, is_active) VALUES
('juan.perez@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Juan', 'Pérez', '+1234567890', 'México', 'Ciudad de México', 'CUSTOMER', TRUE, TRUE),
('maria.garcia@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'María', 'García', '+1234567891', 'España', 'Madrid', 'INSTRUCTOR', TRUE, TRUE),
('carlos.lopez@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Carlos', 'López', '+1234567892', 'Colombia', 'Bogotá', 'CUSTOMER', TRUE, TRUE),
('ana.martinez@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Ana', 'Martínez', '+1234567893', 'Argentina', 'Buenos Aires', 'INSTRUCTOR', TRUE, TRUE);

-- Insertar instructores
INSERT INTO instructors (user_id, bio, specializations, experience_years, rating, total_students, is_verified) VALUES
(3, 'Experta en desarrollo web con más de 10 años de experiencia en tecnologías modernas.', 'React, Node.js, JavaScript, MongoDB', 10, 4.8, 1250, TRUE),
(5, 'Profesional certificada en gestión de proyectos con experiencia en empresas Fortune 500.', 'PMP, Agile, Scrum, Liderazgo', 8, 4.9, 890, TRUE);

-- Insertar algunas citas de ejemplo
INSERT INTO appointments (user_id, instructor_id, certification_id, title, description, appointment_date, appointment_time, duration_minutes, type, status, meeting_url) VALUES
(2, 1, 1, 'Consulta sobre Desarrollo Web', 'Sesión de orientación para el curso de desarrollo web full stack', '2024-08-05', '10:00:00', 60, 'CONSULTATION', 'CONFIRMED', 'https://meet.google.com/abc-def-ghi'),
(4, 2, 2, 'Examen Final - Gestión de Proyectos', 'Examen final para la certificación PMP', '2024-08-07', '14:00:00', 90, 'EXAM', 'SCHEDULED', NULL);

-- Insertar algunas reseñas de ejemplo
INSERT INTO reviews (user_id, certification_id, instructor_id, rating, title, comment, is_verified, is_public) VALUES
(2, 1, 1, 5, 'Excelente curso', 'El curso superó mis expectativas. El instructor es muy claro y los proyectos prácticos son muy útiles.', TRUE, TRUE),
(4, 2, 2, 5, 'Muy recomendado', 'Perfecto para prepararse para el examen PMP. El contenido está muy bien estructurado.', TRUE, TRUE);

