-- Esquema de Base de Datos para Plataforma de Certificaciones Internacionales

-- Tabla de Usuarios
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    country VARCHAR(100),
    city VARCHAR(100),
    address TEXT,
    role ENUM('customer', 'admin', 'instructor') DEFAULT 'customer',
    email_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de Categorías de Certificaciones
CREATE TABLE certification_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Certificaciones
CREATE TABLE certifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    detailed_description LONGTEXT,
    price DECIMAL(10,2) NOT NULL,
    duration_hours INT,
    difficulty_level ENUM('beginner', 'intermediate', 'advanced'),
    language VARCHAR(50) DEFAULT 'es',
    certificate_type ENUM('completion', 'achievement', 'professional'),
    image_url VARCHAR(255),
    syllabus_url VARCHAR(255),
    prerequisites TEXT,
    learning_objectives TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES certification_categories(id)
);

-- Tabla de Instructores
CREATE TABLE instructors (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    bio TEXT,
    qualifications TEXT,
    experience_years INT,
    specializations TEXT,
    profile_image_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tabla de Relación Certificación-Instructor
CREATE TABLE certification_instructors (
    certification_id INT,
    instructor_id INT,
    PRIMARY KEY (certification_id, instructor_id),
    FOREIGN KEY (certification_id) REFERENCES certifications(id),
    FOREIGN KEY (instructor_id) REFERENCES instructors(id)
);

-- Tabla de Pedidos
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    status ENUM('pending', 'processing', 'completed', 'cancelled', 'refunded') DEFAULT 'pending',
    payment_method VARCHAR(50),
    payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
    payment_transaction_id VARCHAR(255),
    billing_address TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tabla de Elementos del Pedido
CREATE TABLE order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    certification_id INT NOT NULL,
    quantity INT DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (certification_id) REFERENCES certifications(id)
);

-- Tabla de Inscripciones
CREATE TABLE enrollments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    certification_id INT NOT NULL,
    order_id INT,
    enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    start_date DATE,
    completion_date DATE,
    progress_percentage DECIMAL(5,2) DEFAULT 0,
    status ENUM('enrolled', 'in_progress', 'completed', 'cancelled') DEFAULT 'enrolled',
    certificate_issued BOOLEAN DEFAULT FALSE,
    certificate_url VARCHAR(255),
    final_score DECIMAL(5,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (certification_id) REFERENCES certifications(id),
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- Tabla de Citas
CREATE TABLE appointments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    certification_id INT,
    instructor_id INT,
    appointment_type ENUM('consultation', 'exam', 'tutoring', 'orientation') NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    scheduled_date DATE NOT NULL,
    scheduled_time TIME NOT NULL,
    duration_minutes INT DEFAULT 60,
    status ENUM('scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show') DEFAULT 'scheduled',
    meeting_url VARCHAR(255),
    meeting_platform VARCHAR(50),
    notes TEXT,
    reminder_sent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (certification_id) REFERENCES certifications(id),
    FOREIGN KEY (instructor_id) REFERENCES instructors(id)
);

-- Tabla de Disponibilidad de Instructores
CREATE TABLE instructor_availability (
    id INT PRIMARY KEY AUTO_INCREMENT,
    instructor_id INT NOT NULL,
    day_of_week ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (instructor_id) REFERENCES instructors(id)
);

-- Tabla de Cupones de Descuento
CREATE TABLE coupons (
    id INT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(50) UNIQUE NOT NULL,
    description VARCHAR(200),
    discount_type ENUM('percentage', 'fixed_amount'),
    discount_value DECIMAL(10,2) NOT NULL,
    minimum_order_amount DECIMAL(10,2) DEFAULT 0,
    max_uses INT,
    current_uses INT DEFAULT 0,
    valid_from DATE,
    valid_until DATE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Uso de Cupones
CREATE TABLE coupon_usage (
    id INT PRIMARY KEY AUTO_INCREMENT,
    coupon_id INT NOT NULL,
    order_id INT NOT NULL,
    user_id INT NOT NULL,
    discount_applied DECIMAL(10,2) NOT NULL,
    used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (coupon_id) REFERENCES coupons(id),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tabla de Reseñas y Calificaciones
CREATE TABLE reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    certification_id INT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(200),
    comment TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (certification_id) REFERENCES certifications(id)
);

-- Tabla de Notificaciones
CREATE TABLE notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    type ENUM('order', 'appointment', 'certification', 'system', 'promotion'),
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    action_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tabla de Configuración del Sistema
CREATE TABLE system_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    description VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Índices para optimización
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_certifications_category ON certifications(category_id);
CREATE INDEX idx_orders_user ON orders(user_id);
CREATE INDEX idx_enrollments_user_cert ON enrollments(user_id, certification_id);
CREATE INDEX idx_appointments_user_date ON appointments(user_id, scheduled_date);
CREATE INDEX idx_reviews_certification ON reviews(certification_id);

-- Datos iniciales
INSERT INTO certification_categories (name, description) VALUES
('Tecnología', 'Certificaciones en tecnología y programación'),
('Negocios', 'Certificaciones en administración y negocios'),
('Idiomas', 'Certificaciones en idiomas internacionales'),
('Salud', 'Certificaciones en el área de la salud'),
('Educación', 'Certificaciones pedagógicas y educativas');

INSERT INTO system_settings (setting_key, setting_value, description) VALUES
('site_name', 'CertificacionesInternacionales.com', 'Nombre del sitio web'),
('contact_email', 'info@certificacionesinternacionales.com', 'Email de contacto'),
('tax_rate', '0.16', 'Tasa de impuesto por defecto'),
('currency', 'USD', 'Moneda por defecto'),
('appointment_duration_default', '60', 'Duración por defecto de citas en minutos');

