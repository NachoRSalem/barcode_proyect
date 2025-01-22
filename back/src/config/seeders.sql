INSERT INTO disfraces (codigo_barra, nombre, descripcion)
VALUES 
('123456789', 'Disfraz de Pirata', 'Un disfraz genial para fiestas'),
('987654321', 'Disfraz de Vampiro', 'Perfecto para Halloween');

INSERT INTO reservas (disfraz_id, fecha_retiro, fecha_devolucion, cliente)
VALUES 
(1, '2025-01-20', '2025-01-25', 'Juan Pedro'),
(2, '2025-01-22', '2025-01-28', 'Ana Lucía');
