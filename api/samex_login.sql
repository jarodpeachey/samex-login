CREATE DATABASE samex_login;

USE samex_login;

CREATE TABLE users (
  id INT(11) NOT NULL AUTO_INCREMENT KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  hashpassword CHAR(32) NOT NULL UNIQUE
);

ALTER TABLE users MODIFY
  hashpassword CHAR(32)
    CHARACTER SET ascii
    COLLATE ascii_bin
    NOT NULL;
