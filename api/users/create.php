<?php
  $requestMethod = $_SERVER["REQUEST_METHOD"];
  include('../class/Database.php');

  $api = new Database();

  switch($requestMethod) {
    case 'POST':
      $api->insertUser($_POST);
      break;
    default:
      header("HTTP/1.0 405 Method Not Allowed");
      break;
  }
?>
