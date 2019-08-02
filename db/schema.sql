DROP DATABASE IF EXISTS audit_db;
CREATE DATABASE audit_db;

USE audit_db;

DROP TABLE IF EXISTS audit_db.users;
CREATE TABLE users (
  uid VARCHAR(100) NOT NULL,
  role VARCHAR(10) NOT NULL,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phoneNumber VARCHAR(250) NOT NULL,
  createdAt DATE NULL,
  updatedAt DATE NULL,
  PRIMARY KEY (uid)
);

INSERT INTO audit_db.users (uid, role, firstName, lastName, email, phoneNumber) VALUES ('2GDYfyn9L7MQ8L6kJIi3l2xuQ0S2', 'admin', 'Aldo', 'Solano', 'aldoglez34@gmail.com', '2281112031');

DROP TABLE IF EXISTS audit_db.clients;
CREATE TABLE clients (
  cid INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  acronym VARCHAR(50) NOT NULL,
  rfc VARCHAR(50) NULL,
  address VARCHAR(200) NULL,
  createdAt DATE NULL,
  updatedAt DATE NULL,
  PRIMARY KEY (cid)
);

INSERT INTO audit_db.clients (cid, name, acronym, rfc, address) VALUES (1, 'Secretaría de Educación de Veracruz', 'SEV', 'SED9905019C2', 'Km 4.5, Carretera federal Xalapa-Veracruz s/n, Col. Sahop, CP 91190, Veracruz, México');
INSERT INTO audit_db.clients (cid, name, acronym, rfc, address) VALUES (2, 'Contraloría General', 'CONTRALORÍA', 'CGE000520DV5', 'Carrillo Puerto No. 20 Piso 1, Colonia Centro, Veracruz, México');
INSERT INTO audit_db.clients (cid, name, acronym, rfc, address) VALUES (3, 'Asamblea Legislativa del Distrito Federal', 'ALDF', 'ALD971028S24', 'Donceles y Allende s/n Centro Histórico, Delegación Cuahutémoc, CP 06010, CDMX');
INSERT INTO audit_db.clients (cid, name, acronym, rfc, address) VALUES (4, 'Órgano de Fiscalización Superior del Estado de Veracruz', 'ORFIS', 'OFS000526912', 'Carretera Xalapa-Veracruz No. 1102, Esq. Boulevard Culturas Veacruzanas. Ref: Col. Reserva Territorial, C.P. 91096, Veracruz, México');
INSERT INTO audit_db.clients (cid, name, acronym, rfc, address) VALUES (5, 'Colegio de Bachilleres del Estado de Veracruz', 'COBAEV', 'CBE880730K13', 'Avenida Américas No. 24, Col. Aguacatal, CP 91130, Veracruz, México');
INSERT INTO audit_db.clients (cid, name, acronym, rfc, address) VALUES (6, 'Colegio de Estudios Científicos y Tecnológicos del Estado de Veracruz', 'CECYTEV', 'CEC941104AN5', 'Manuel R. Gutiérrez 12 del Maestro, C.P. 91030, Veracruz, México');

DROP TABLE IF EXISTS audit_db.audits;
CREATE TABLE audits (
  aid INT NOT NULL AUTO_INCREMENT,
  clientName VARCHAR(150) NOT NULL,
  clientAcronym VARCHAR(50) NOT NULL,
  year INT NOT NULL,
  createdAt DATE NULL,
  updatedAt DATE NULL,
  PRIMARY KEY (aid)
);

INSERT INTO audit_db.audits (aid, clientAcronym, clientName, year) VALUES (1, 'Secretaría de Educación de Veracruz', 'SEV', 2018);
INSERT INTO audit_db.audits (aid, clientAcronym, clientName, year) VALUES (2, 'Asamblea Legislativa del Distrito Federal', 'ALDF', 2017);
INSERT INTO audit_db.audits (aid, clientAcronym, clientName, year) VALUES (3, 'Colegio de Bachilleres del Estado de Veracruz', 'COBAEV', 2017);


DROP TABLE IF EXISTS audit_db.auditsVision;
CREATE TABLE auditsVision (
  aid INT NOT NULL,
  uid VARCHAR(100) NOT NULL,
  createdAt DATE NULL,
  updatedAt DATE NULL
);

INSERT INTO audit_db.auditsVision (aid, uid) VALUES (1, '2GDYfyn9L7MQ8L6kJIi3l2xuQ0S2');
INSERT INTO audit_db.auditsVision (aid, uid) VALUES (2, '2GDYfyn9L7MQ8L6kJIi3l2xuQ0S2');
INSERT INTO audit_db.auditsVision (aid, uid) VALUES (3, '2GDYfyn9L7MQ8L6kJIi3l2xuQ0S2');