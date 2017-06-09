CREATE DATABASE AgendaIn6am;

CREATE TABLE Categoria(
	idCategoria INT NOT NULL AUTO_INCREMENT,
    nombreCategoria VARCHAR(30) NOT NULL,
	PRIMARY KEY (idCategoria)
    );
    
CREATE TABLE Contacto(
	idContacto INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(30) NOT NULL,
    apellido VARCHAR(30) NOT NULL,
    direccion VARCHAR(30) NOT NULL,
    telefono VARCHAR(30) NOT NULL,
    email VARCHAR(40) NOT NULL,
    idCategoria INT NOT NULL,
    PRIMARY KEY(idContacto),
    FOREIGN KEY (idCategoria) REFERENCES Categoria(idCategoria)

);

CREATE TABLE Historial(
	idHistorial INT NOT NULL AUTO_INCREMENT,
    accion VARCHAR(30) NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (idUsuario)
);

CREATE TABLE Usuario(
	idUsuario INT NOT NULL AUTO_INCREMENT,
    nombreUsuario VARCHAR(30) NOT NULL,
    contrasena VARCHAR(30) NOT NULL,
    PRIMARY KEY (idUsuario)
);

CREATE TABLE UsuarioDetalle(
	idUsuarioDetalle INT NOT NULL AUTO_INCREMENT,
    idUsuario INT NOT NULL,
    idContacto INT NOT NULL,
    PRIMARY KEY (idUsuarioDetalle),
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario),
    FOREIGN KEY (idContacto) REFERENCES Contacto(idContacto)
);