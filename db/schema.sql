DROP DATABASE IF EXISTS gaa_db;
CREATE DATABASE gaa_db;

USE gaa_db;

DROP TABLE IF EXISTS gaa_db.users;
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

INSERT INTO gaa_db.users (uid, role, firstName, lastName, email, phoneNumber) VALUES ('2GDYfyn9L7MQ8L6kJIi3l2xuQ0S2', 'admin', 'Aldo', 'Solano González', 'aldoglez34@gmail.com', '2281112031');