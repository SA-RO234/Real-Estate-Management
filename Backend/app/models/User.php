<?php

require_once __DIR__ . "../../config/database.php";

class User{
    private $conn;
    public function __construct(Database $database){
        $this->conn = $database->getConnection();
    }

    //  get All users
    public function getAllUsers()
    {
        $sql = "SELECT * FROM uusers";
        $result = $this->conn->query($sql);
        return $result->fetchall(PDO::FETCH_ASSOC);
    }

    //    get users by ID 
    public function getUserByID($id)
    {
        $sql = "SELECT * FROM uusers WHERE id = ? ";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindparam("i", $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    //  register method 
    public function register($name, $email, $password, $role)
    {
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
        $sql  = "INSERT INTO uuser (name , email , password , role) VALUES ( ? , ? , ? , ?)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindparam("ssss", $name, $email, $hashedPassword, $role);
        return $stmt->execute();
    }
    //  Login method
    public function login($email, $password){
        $sql = "SELECT * FROM user WHERE email = ? ";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindparam("s", $email);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($result && password_verify($password, $result['password'])) {
            return $result;
        }
        return null;
    }

    
}
