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
    ('Argentina',      1),
    ('Bolivia',        85),
    ('Brasil',         5),
    ('Chile',          42),
    ('Colombia',       12),
    ('Ecuador',        31),
    ('Paraguay',       56),
    ('Perú',           32),
    ('Canadá',         49),
    ('México',         14),
    ('Jamaica',        55),
    ('Estados Unidos', 11),
    ('Uruguay',        15),
    ('Venezuela',      54),
    ('Panamá',         45),
    ('Costa Rica',     52);

INSERT INTO Partido(id, equipo1, equipo2, equipo1_goles, equipo2_goles, etapa, fecha, finalizado) VALUES
    ('1', 'Perú',           'Chile',     0, 0, 'GRUPOS', '2024-06-21 21:00:00', false),
    ('2', 'Ecuador',        'Venezuela', 0, 0, 'GRUPOS', '2024-06-22 19:00:00', false),
    ('3', 'Argentina',      'Canadá',    0, 0, 'GRUPOS', '2024-06-20 21:00:00', false),
    ('4', 'México',         'Jamaica',   0, 0, 'GRUPOS', '2024-06-22 22:00:00', false),
    ('5', 'Estados Unidos', 'Bolivia',   0, 0, 'GRUPOS', '2024-06-23 19:00:00', false),
    ('6', 'Uruguay',        'Panamá',    0, 0, 'GRUPOS', '2024-06-23 22:00:00', false),
    ('7', 'Colombia',        'Paraguay',    0, 0, 'GRUPOS', '2024-06-24 19:00:00', false),
    ('8', 'Brasil',         'Costa Rica',   0, 0, 'GRUPOS', '2024-06-24 22:00:00', false),
    ('9', 'Perú', 'Canadá',   0, 0, 'GRUPOS', '2024-06-25 19:00:00', false),
    ('10', 'Chile', 'Argentina',   0, 0, 'GRUPOS', '2024-06-25 22:00:00', false),
    ('11', 'Ecuador', 'Jamaica',   0, 0, 'GRUPOS', '2024-06-26 19:00:00', false),
    ('12', 'Venezuela', 'México',   0, 0, 'GRUPOS', '2024-06-26 22:00:00', false),
    ('13', 'Panamá', 'Estados Unidos',   0, 0, 'GRUPOS', '2024-06-27 19:00:00', false),
    ('14', 'Uruguay', 'Bolivia',   0, 0, 'GRUPOS', '2024-06-27 22:00:00', false),
    ('15', 'Colombia', 'Costa Rica',   0, 0, 'GRUPOS', '2024-06-28 19:00:00', false),
    ('16', 'Paraguay', 'Brasil',   0, 0, 'GRUPOS', '2024-06-28 22:00:00', false),
    ('17', 'Argentina', 'Perú',   0, 0, 'GRUPOS', '2024-06-29 21:00:00', false),
    ('18', 'Canadá', 'Chile',   0, 0, 'GRUPOS', '2024-06-29 21:00:00', false),
    ('19', 'México', 'Ecuador',   0, 0, 'GRUPOS', '2024-06-30 21:00:00', false),
    ('20', 'Jamaica', 'Venezuela',   0, 0, 'GRUPOS', '2024-06-30 21:00:00', false),
    ('21', 'Bolivia', 'Panamá',   0, 0, 'GRUPOS', '2024-07-01 22:00:00', false),
    ('22', 'Estados Unidos', 'Uruguay',   0, 0, 'GRUPOS', '2024-07-01 22:00:00', false),
    ('23', 'Brasil', 'Colombia',   0, 0, 'GRUPOS', '2024-07-02 22:00:00', false),
    ('24', 'Costa Rica', 'Paraguay',   0, 0, 'GRUPOS', '2024-07-02 22:00:00', false);

INSERT INTO Usuario(usuario, nombres, apellidos, email, contrasena, es_admin, puntaje, carrera, primer_lugar, segundo_lugar) VALUES
    ('admin', 'admin', 'admin', 'correo@correo.com', 'admin', true, NULL, NULL, NULL, NULL);