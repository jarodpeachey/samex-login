<?php
  session_start();
  class Database {
    private $host  = 'localhost';
    private $user  = 'root';
    private $password   = "root";
    private $database  = "samex_login";      
    private $table = 'users';
    private $dbConnect = false;
    private $loggedInUser;

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

    function insertUser($userData){
      //Set variables from form
      $userName = $userData['name'];
      $userEmail = $userData['email'];
      $userPassword = password_hash($userData['password'], PASSWORD_DEFAULT);

      // Check if email already exists in db
      $checkEmailQuery = "SELECT * FROM users WHERE email='$userEmail'";
      $response = mysqli_query($this->dbConnect, $checkEmailQuery);
      if ($response) {
        if(mysqli_num_rows($response) > 0) {
          // Email exists - terminate and send data
          echo json_encode(["email_used" => true]);
        } else {
          $insertUserQuery = "INSERT INTO users (username, email, hashpassword)
            VALUES ('$userName', '$userEmail', '$userPassword');";

          if (mysqli_query($this->dbConnect, $insertUserQuery)) {
            echo json_encode(["email_used" => false, "success" => true]);
          } else {
            echo json_encode(["email_used" => false, "success" => false]);
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
    } // End insertUser()

    function verifyUser ($userData) {
      //Set variables from form
      $userEmail = $userData['email'];
      $userPassword = $userData['password'];

      // Check if email already exists in db
      $checkEmailQuery = "SELECT * FROM users WHERE email='$userEmail'";
      $response = mysqli_query($this->dbConnect, $checkEmailQuery);
      if ($response) {
        if($response->num_rows > 0) {
          while ($row = $response->fetch_assoc()) {
            if (password_verify("$userPassword", $row['hashpassword'])) {
              // Passwords match
              $_SESSION['loggedInUser'] = [
                "name" => $row['username'],
                "email" => $row['email']
              ];
              echo json_encode(["match" => true, "user" => $this->loggedInUser]);
            } else {
              echo json_encode(["match" => false, "other" => "Password does not match"]);
            }
          }
        } else {
          echo json_encode(["match" => false, "other" => "No rows"]);
        }
      } else {
        echo "Cannot login";         
      }
    
      header('Content-Type: application/json');
    } // End verifyUser

    function getUser ($getUserData) {
      echo json_encode($_SESSION['loggedInUser']);
    } // End getUser()
  }
?>

