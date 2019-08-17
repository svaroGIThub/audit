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

INSERT INTO audit_db.users (uid, role, firstName, lastName, email, phoneNumber) VALUES ('2GDYfyn9L7MQ8L6kJIi3l2xuQ0S2', 'Admin', 'Aldo', 'Solano', 'aldoglez34@gmail.com', '2281112031');