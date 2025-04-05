<?php
require_once __DIR__ . "../../models/UserModel.php";
require "../../config/database.php";
header("Content-Type :application/json");
session_start();
class UserController
{
    private $userModel;
    public function __construct()
    {
        $database = new Database();
        $db = $database->getConnection();
        $this->userModel = new User($db);
    }
    public function register(){
        // Get the raw POST body
        $json = file_get_contents("php://input");
        $data = json_decode($json, true); // Decode JSON to an associative array

        // Check if JSON decoding was successful
        if (json_last_error() !== JSON_ERROR_NONE) {
            echo json_encode(["message" => "Invalid JSON input."]);
            return;
        }

        // Validate required fields
        if (empty($data['email']) || empty($data['password']) || empty($data['role']) || empty($data['phone']) || empty($data['name'])){
            echo json_encode(["message" => "Missing required fields."]);
            return;
        }

        $email = filter_var($data['email'], FILTER_VALIDATE_EMAIL);
        if (!$email) {
            echo json_encode(["message" => "Invalid email format."]);
            return;
        }

        $password = $data['password'];
        $role = $data['role'];
        $phone = $data['phone'];
        $name = $data['name'];

        // Call the model to register the user
        if ($this->userModel->register($name, $email, $password, $phone, $role)) {
            echo json_encode(["message" => "User registered successfully!"]);
        } else {
            echo json_encode(["message" => "Error registering user."]);
        }
    }

    //  Login controller
    public function login(){
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data) {
            echo json_encode(["success" => false, "message" => "Invalid JSON input"]);
            return;
        }else{
  
        if ($this->userModel->login($data['email'], $data['password'])) {
            echo json_encode(["success" => true, "message" => "Login successful"]);
        } else {
            echo json_encode(["success" => false, "message" => "Invalid credentials"]);
        }
        }
    }

    public function logout(){
        session_start();
        session_destroy();
        echo "Logget is Successfuly ! ";
    }

    //  method getUser by role 
    function getUserbyRole($role){
        header("Content-Type: application/json");
        $users = $this->userModel->getUserByRole($role);
        echo json_encode($users, JSON_PRETTY_PRINT);
    }
    //  git all user
    function getAllUser(){
        header("Content-Type: application/json");
        $users = $this->userModel->getAllUsers();
        echo json_encode($users, JSON_PRETTY_PRINT);
    }
}
