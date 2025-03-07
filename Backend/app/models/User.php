<?php

require_once __DIR__ . "../../config/database.php";


class User{
    private $conn;
    public function __construct(){
        global $conn;
        $this->conn = $conn;
    }

    //  get All users
   public function getAllUsers(){
       $sql = "SELECT * FROM uusers";
       $result = $this->conn->quary($sql);
       return $result->fetch_all(MYSQLI_ASSOC);
   }

//    get users by ID 
    public function getUserByID($id){
         $sql = "SELECT * FROM uusers WHERE id = ? ";
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("i",$id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc( );
    }
}
