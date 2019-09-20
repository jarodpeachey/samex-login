<?php
  class Database {
    private $host  = 'localhost';
    private $user  = 'root';
    private $password   = "root";
    private $database  = "samex_login";      
    private $table = 'users';
    private $dbConnect = false;

    public function __construct(){
      if(!$this->dbConnect){ 
          $conn = new mysqli($this->host, $this->user, $this->password, $this->database);
          if($conn->connect_error){
              die("Error failed to connect to MySQL: " . $conn->connect_error);
          }else{
              $this->dbConnect = $conn;
          }
      }
    }
    function insertUser($insertUserData){
      $userName = $insertUserData['name'];
      $userEmail = $insertUserData['email'];
      $userPassword = password_hash($insertUserData['password'], PASSWORD_DEFAULT);

      $checkEmailQuery = "SELECT * FROM users WHERE email='$userEmail'";
      $response = mysqli_query($this->dbConnect, $checkEmailQuery);
      if ($response) {
        if(mysqli_num_rows($response) > 0) {
          echo "User already exists";
        } else {
          $insertUserQuery = "INSERT INTO users (username, email, hashpassword)
            VALUES ('$userName', '$userEmail', '$userPassword');";

          if (mysqli_query($this->dbConnect, $insertUserQuery)) {
            echo "You are now registered<br/>";
          } else {
            echo "Error adding user in database<br/>";
          }   
        }
      } else {
        $insertUserQuery = "INSERT INTO users (username, email, hashpassword)
          VALUES ('$userName', '$userEmail', '$userPassword');";

        if (mysqli_query($this->dbConnect, $insertUserQuery)) {
          echo "You are now registered<br/>";
        } else {
          echo "Error adding user in database<br/>";
        }           
      }
    
      header('Content-Type: application/json');
    }
    function getUser ($getUserData) {
      $email = $getUserData['email'];
      $getUserQuery = "SELECT * FROM users WHERE email=$email";
      $resultData = mysqli_query($conn, $getUserQuery);


      if ($resultData->rowCounter() > 0) {
        $returnData = "HELLO!";
      } else {
        $returnData = mysqli_fetch_assoc($resultData);
      }

      header("Content-Type: application/json");
    }
  }
?>

