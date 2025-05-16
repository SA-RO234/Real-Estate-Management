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
        return $result->fetchAll(PDO::FETCH_ASSOC);
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
    // Register  user model
    public function register($name, $email, $phone , $role, $password){
        try {
            $hashedPassword = password_hash($password, PASSWORD_BCRYPT);
            $sql = "INSERT INTO users (name, email, password, phone , role) VALUES (:name, :email, :password,:phone ,:role)";
            $stmt = $this->conn->prepare($sql);
            
            return $stmt->execute([
                ':name' => $name,
                ':email' => $email,
                ':password' => $hashedPassword,
                ':phone' => $phone,
                ':role' => $role
            ]);
        } catch (PDOException $e) {
            return $e->getMessage();
        }
       
    }

    //  Login method
    public function login($email, $password) {
        try {
            $sql = "SELECT * FROM users WHERE email = ?";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute([$email]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
            // Check if user exists and verify the password
            if ($user && password_verify($password, $user['password'])) {
                return $user; // Return user data to the controller
            }
    
            // Return false if login fails
            return false;
        } catch (PDOException $e) {
            // Log the error or handle it appropriately
            return false;
        }
    }

    // Logout User
    public function logout(){
        session_start();
        session_destroy();
    }

    //  update model
    public function updateUserByID($id, $data)
    {
        try {
            $fields = [];
            $params = [];
            if (isset($data['name'])) {
                $fields[] = "name = :name";
                $params[':name'] = $data['name'];
            }
            if (isset($data['email'])) {
                $fields[] = "email = :email";
                $params[':email'] = $data['email'];
            }
            if (isset($data['role'])) {
                $fields[] = "role = :role";
                $params[':role'] = $data['role'];
            }
            if (isset($data['phone'])) {
                $fields[] = "phone = :phone";
                $params[':phone'] = $data['phone'];
            }
            if (isset($data['password'])) {
                $fields[] = "password = :password";
                $params[':password'] = password_hash($data['password'], PASSWORD_BCRYPT);
            }
            if (empty($fields)) return false;
            $params[':id'] = $id;
            $sql = "UPDATE users SET " . implode(', ', $fields) . " WHERE id = :id";
            $stmt = $this->conn->prepare($sql);
            return $stmt->execute($params);
        } catch (PDOException $e) {
            return false;
        }
    }
 
    //  Delete model
    function DeleteUser($id){
        $stmt = $this->conn->prepare("DELETE FROM users WHERE id = ?");
        $stmt->bindParam("i",$id);
        $stmt->execute();
    }
}

// Connect to the database
$pdo = new PDO('mysql:host=localhost;dbname=real_estatedb', 'root', '');
// Fetch all users with plain-text passwords
$stmt = $pdo->query("SELECT id, password FROM users");
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);
foreach ($users as $user) {
    // Check if the password is already hashed
    if (!password_get_info($user['password'])['algo']) {
        // Hash the plain-text password
        $hashedPassword = password_hash($user['password'], PASSWORD_BCRYPT);
        // Update the database with the hashed password
        $updateStmt = $pdo->prepare("UPDATE users SET password = ? WHERE id = ?");
        $updateStmt->execute([$hashedPassword, $user['id']]);
    }
}