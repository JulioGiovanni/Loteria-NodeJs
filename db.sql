-- Crear la base de datos
CREATE DATABASE loteria_db;

-- Usar la base de datos
USE loteria_db;

-- Crear la tabla 'cartas'
CREATE TABLE cartas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL
);

-- Crear la tabla 'tablas'
CREATE TABLE tablas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(20) NOT NULL
);

-- Crear la tabla 'cartas_tablas' para relacionar cartas con tablas
CREATE TABLE cartas_tablas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    carta_id INT,
    tabla_id INT,
    FOREIGN KEY (carta_id) REFERENCES cartas(id),
    FOREIGN KEY (tabla_id) REFERENCES tablas(id),
    UNIQUE (carta_id, tabla_id)
);

-- Insertar los nombres de las cartas en la tabla 'cartas'
INSERT INTO cartas (nombre) VALUES
    ('El gallo'), ('El diablito'), ('La dama'), ('El catrín'), ('El paraguas'),
    ('La sirena'), ('La escalera'), ('La botella'), ('El barril'), ('El árbol'),
    ('El melón'), ('El valiente'), ('El gorrito'), ('La muerte'), ('La pera'),
    ('La bandera'), ('El bandolón'), ('El violoncello'), ('La garza'), ('El pájaro'),
    ('La mano'), ('La bota'), ('La luna'), ('El cotorro'), ('El borracho'),
    ('El negrito'), ('El corazón'), ('La sandía'), ('El tambor'), ('El camarón'),
    ('Las jaras'), ('El músico'), ('La araña'), ('El soldado'), ('La estrella'),
    ('El cazo'), ('El mundo'), ('El apache'), ('El nopal'), ('El alacrán'),
    ('La rosa'), ('La calavera'), ('La campana'), ('El cantarito'), ('El venado'),
    ('El sol'), ('La corona'), ('La chalupa'), ('El pino'), ('El pescado'),
    ('La palma'), ('La maceta'), ('El arpa'), ('La rana');