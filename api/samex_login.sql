CREATE DATABASE samex_login;

USE samex_login;

CREATE TABLE users (
  id INT(11) NOT NULL AUTO_INCREMENT KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  hashpassword CHAR(64) NOT NULL UNIQUE
);
