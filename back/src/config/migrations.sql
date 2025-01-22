CREATE TABLE disfraces (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo_barra VARCHAR(255) NOT NULL UNIQUE,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);



CREATE TABLE reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    disfraz_id INT NOT NULL,
    fecha_retiro DATE NOT NULL,
    fecha_devolucion DATE NOT NULL,
    cliente VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (disfraz_id) REFERENCES disfraces(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

