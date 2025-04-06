<?php
header("Content-Type :application/json");
require "../controllers/UserController.php";


$usersController = new UserController();

$method = $_SERVER['REQUEST_METHOD'];
$url = $_SERVER['REQUEST_URI'];

$routes = [
    "GET" => function () use ($usersController) {
        if (isset($_GET['role'])) {
            $usersController->getUserByRole($_GET['role']);
        } else {
            $usersController->getAllUser();
        }
    },
    "POST" => function () use ($usersController) {
        $input = json_decode(file_get_contents("php://input"), true);
        // Check if the request is for registration (requires name, phone, role)
        if (isset($input['name']) && isset($input["email"]) && isset($input['phone']) && isset($input["password"]) && isset($input['role'])) {
            $usersController->register($input);
        }
        // Otherwise, treat it as a login request (requires email and password)
        elseif (isset($input['email']) && isset($input['password'])) {
            $usersController->login();
        } else {
            echo json_encode(["message" => "Invalid request: Missing required fields."]);
        }
    },
];
if (array_key_exists($method, $routes)) {
    $routes[$method]();
}
