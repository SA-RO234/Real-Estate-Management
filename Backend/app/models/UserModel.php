<?php

class User{
    private $conn;
    public function __construct($database){
        $this->conn = $database;
    }

    //  get All users
    public function getAllUsers(){
        $sql = "SELECT * FROM users";
        $result = $this->conn->query($sql);
        return $result->fetch(PDO::FETCH_ASSOC);
    }

    //    get users by ID 
    public function getUserByRole($role)
    {
        $sql = "SELECT * FROM users WHERE role = :role";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(":role", $role);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    // Register New User
    public function register($name, $email, $password, $phone , $role){
        $hashedPassword = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);
        $sql = "INSERT INTO users (name, email, password, phone , role) VALUES (:name, :email, :password,:phone ,:role)";
        $stmt = $this->conn->prepare($sql);
        return $stmt->execute(['name' => $name, 'email' => $email, 'password' => $hashedPassword,'phone'=> $phone , 'role' => $role]);
    }

    //  Login method
    public function login($email, $password){
        $sql = "SELECT * FROM users WHERE email = :email";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (password_verify($password, $user['password'])) {
            session_start();
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['role'] = $user['role'];
            return true;
        }
        return false;
    }

    // Logout User
    public function logout(){
        session_start();
        session_destroy();
    }

    //  update model

    function UpdateUserbyID($id)
    {
        $data = json_decode(file_get_contents("php:/input", true));
        $stmt = $this->conn->prepare("UPDATE users SET  name = ? , email = ? , password = ? , role = ? WHERE id = ? ");
        $stmt->bindparam("ssssi", $data['name'], $data['email'], $data['password'], $data['role'], $id);
        $stmt->execute();
    }

    //  Delete model
    function DeleteUser($id){
        $stmt = $this->conn->prepare("DELETE FROM users WHERE id = ?");
        $stmt->bindParam("i",$id);
        $stmt->execute();
    }
}
