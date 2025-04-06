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

        if (isset($input['email']) && isset($input['password'])) {
            $usersController->login();
        } else {
            $usersController->register();
        }
    }
];
if (array_key_exists($method, $routes)) {
    $routes[$method]();
}
