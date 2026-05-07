CREATE DATABASE clubmanager;
USE clubmanager;

CREATE TABLE trabajadores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  cargo VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE socios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  dni VARCHAR(20) UNIQUE NOT NULL,
  email VARCHAR(100),
  telefono VARCHAR(20),
  tipo_membresia ENUM('basico','plata','oro') DEFAULT 'basico',
  estado ENUM('activo','inactivo','vencido') DEFAULT 'activo',
  fecha_vencimiento DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE instalaciones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  tipo ENUM('tenis','futbol','piscina','gimnasio','salon') NOT NULL,
  capacidad INT DEFAULT 1,
  descripcion VARCHAR(255)
);

CREATE TABLE reservas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  socio_id INT NOT NULL,
  instalacion_id INT NOT NULL,
  fecha DATE NOT NULL,
  hora_inicio TIME NOT NULL,
  hora_fin TIME NOT NULL,
  estado ENUM('pendiente','confirmada','cancelada') DEFAULT 'pendiente',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (socio_id) REFERENCES socios(id),
  FOREIGN KEY (instalacion_id) REFERENCES instalaciones(id)
);

-- Datos de prueba
INSERT INTO instalaciones (nombre, tipo, capacidad) VALUES
('Cancha 1', 'tenis', 4),
('Cancha 2', 'tenis', 4),
('Campo de fútbol', 'futbol', 22),
('Piscina principal', 'piscina', 50),
('Gimnasio', 'gimnasio', 40),
('Salón de eventos', 'salon', 200);

INSERT INTO socios (nombre, dni, email, tipo_membresia, estado, fecha_vencimiento) VALUES
('Carlos Ríos', '12345678', 'carlos@mail.com', 'oro', 'activo', '2025-12-31'),
('María López', '87654321', 'maria@mail.com', 'plata', 'activo', '2025-06-30'),
('Juan Pérez', '11223344', 'juan@mail.com', 'basico', 'activo', '2025-03-31');