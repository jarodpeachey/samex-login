<?php
  class Rest {
    private $host  = 'localhost';
    private $user  = 'root';
    private $password   = "root";
    private $database  = "samex_login";      
    private $empTable = 'users';
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
    function insertUser($userData){
      // $connections = new Connections();
      // $connections->createDatabaseIfNotExists();
      // $connections->createTableIfNotExists();	

      $userName=$userData["nameValue"];
      $userEmail=$userData["emailValue"];
      $userPassword=$userData["passwordValue"];
      $userQuery="
        INSERT INTO ".$this->userTable." 
        SET name='".$userName."', email='".$userEmail."', password='".$userPassword."'";
      if( mysqli_query($this->dbConnect, $userQuery)) {
        $message = "User created succesfully.";
        $status = 1;			
      } else {
        $message = "User creation failed.";
        $status = 0;			
      }
      $userResponse = array(
        'status' => $status,
        'status_message' => $message
      );
      header('Content-Type: application/json');
      echo json_encode($userResponse);
    }
  }
?>
