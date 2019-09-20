<?php
  $requestMethod = $_SERVER["REQUEST_METHOD"];
  include('../class/Rest.php');

  $dbhost = 'localhost';
  $dbuser = 'root';
  $dbpass = 'root';
  $mysqli = new mysqli($dbhost, $dbuser, $dbpass);

  if (!$mysqli) {
    die('Could not connect: ' . $mysqli->connect_error);
  }

  // Make my_db the current database
  $db_selected = $mysqli->select_db('samex_login');

  if (!$db_selected) {
    // If we couldn't, then it either doesn't exist, or we can't see it.
    $sql = 'CREATE DATABASE samex_login';

    if ($mysqli->query($sql)) {
        echo "Database samex_login created successfully\n";
    } else {
        echo 'Error creating database: ' . $mysqli->error . "\n";
    }
  }

  $sqlTable = 'CREATE TABLE IF NOT EXISTS users(
    id INT NOT NULL AUTO_INCREMENT KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )';
  $mysqli->select_db('samex_login');
  $retval = $mysqli->query($sqlTable);
  
  if(! $retval ) {
    die('Could not create table: ' . $mysqli->error);
  }
  echo "Table created successfully\n";

  $mysqli->close();

  $api = new Rest();

  switch($requestMethod) {
    case 'POST':
      echo('Post Name: ' . $_POST['name']);
      $api->insertUser($_POST);
      break;
    default:
      echo ("Not allowed: " . $_POST['name']);
      header("HTTP/1.0 405 Method Not Allowed");
      break;
  }
?>