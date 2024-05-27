CREATE DATABASE IF NOT EXISTS penca_ucu;

USE penca_ucu;

CREATE TABLE Usuario
(
    usuario       VARCHAR(255) PRIMARY KEY,
    nombres       VARCHAR(255) NOT NULL,
    apellidos     VARCHAR(255) NOT NULL,
    email         VARCHAR(255) NOT NULL,
    contrasena    VARCHAR(255) NOT NULL,
    es_admin      BOOLEAN      NOT NULL,
    puntaje       INT,
    carrera       VARCHAR(255),
    primer_lugar  VARCHAR(255),
    segundo_lugar VARCHAR(255),

    CONSTRAINT email_unico UNIQUE (email)
);

CREATE TABLE Prediccion
(
    usuario       VARCHAR(255) NOT NULL,
    id_partido    VARCHAR(255) NOT NULL,
    equipo1_goles SMALLINT     NOT NULL,
    equipo2_goles SMALLINT     NOT NULL,
    puntaje       INT          NOT NULL,

    PRIMARY KEY (usuario, id_partido)
);

CREATE TABLE Partido
(
    id            VARCHAR(255) PRIMARY KEY,
    equipo1       VARCHAR(255) NOT NULL,
    equipo2       VARCHAR(255) NOT NULL,
    equipo1_goles SMALLINT     NOT NULL,
    equipo2_goles SMALLINT     NOT NULL,
    etapa         ENUM('GRUPOS', 'CUARTOS_DE_FINAL', 'SEMIFINAL', 'TERCER_PUESTO', 'FINAL') NOT NULL,
    fecha         DATETIME     NOT NULL,
    finalizado    BOOLEAN      NOT NULL
);

CREATE TABLE Equipo
(
    pais         VARCHAR(255) PRIMARY KEY,
    ranking_fifa SMALLINT     NOT NULL
);

ALTER TABLE Prediccion
ADD CONSTRAINT Prediccion_Usuario_usuario_fk
FOREIGN KEY (usuario) REFERENCES Usuario (usuario);

ALTER TABLE Prediccion
ADD CONSTRAINT Prediccion_Partido_id_fk
FOREIGN KEY (id_partido) REFERENCES Partido (id);

ALTER TABLE Partido
ADD CONSTRAINT Partido_Equipo_equipo1_fk
FOREIGN KEY (equipo1) REFERENCES Equipo (pais);

ALTER TABLE Partido
ADD CONSTRAINT Partido_Equipo_equipo2_fk
FOREIGN KEY (equipo2) REFERENCES Equipo (pais);

ALTER TABLE Usuario
ADD CONSTRAINT Usuario_Equipo_primer_lugar_fk
FOREIGN KEY (primer_lugar) REFERENCES Equipo (pais);

ALTER TABLE Usuario
ADD CONSTRAINT Usuario_Equipo_segundo_lugar_fk
FOREIGN KEY (segundo_lugar) REFERENCES Equipo (pais);

INSERT INTO Equipo (pais, ranking_fifa) VALUES
    ('Argentina',      5),
    ('Bolivia',        75),
    ('Brasil',         1),
    ('Chile',          21),
    ('Colombia',       15),
    ('Ecuador',        63),
    ('Paraguay',       40),
    ('Perú',           28),
    ('Canadá',         45),
    ('México',         23),
    ('Jamaica',        112),
    ('Estados Unidos', 51),
    ('Uruguay',        3),
    ('Venezuela',      31),
    ('Panamá',         162);

INSERT INTO Partido(id, equipo1, equipo2, equipo1_goles, equipo2_goles, etapa, fecha, finalizado) VALUES
    ('1', 'Perú',           'Chile',     0, 0, 'GRUPOS', '2024-06-21 21:00:00', false),
    ('2', 'Ecuador',        'Venezuela', 0, 0, 'GRUPOS', '2024-06-22 19:00:00', false),
    ('3', 'Argentina',      'Canadá',    0, 0, 'GRUPOS', '2024-06-20 21:00:00', false),
    ('4', 'México',         'Jamaica',   0, 0, 'GRUPOS', '2024-06-22 22:00:00', false),
    ('5', 'Estados Unidos', 'Bolivia',   0, 0, 'GRUPOS', '2024-06-23 19:00:00', false),
    ('6', 'Uruguay',        'Panamá',    0, 0, 'GRUPOS', '2024-06-23 22:00:00', false);

INSERT INTO Usuario(usuario, nombres, apellidos, email, contrasena, es_admin, puntaje, carrera, primer_lugar, segundo_lugar) VALUES
    ('admin', 'admin', 'admin', 'correo@correo.com', 'admin', true, NULL, NULL, NULL, NULL);