DROP DATABASE IF EXISTS gaa_db;
CREATE DATABASE gaa_db;

USE gaa_db;

DROP TABLE IF EXISTS gaa_db.users;
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  phoneNumber VARCHAR(250) NOT NULL,
  createdAt DATE NULL,
  updatedAt DATE NULL,
  PRIMARY KEY (id)
);

INSERT INTO gaa_db.users (name, lastName, email, password, phoneNumber) VALUES ('Aldo', 'Solano González', 'aldoglez34@gmail.com', '123', '2281112031');