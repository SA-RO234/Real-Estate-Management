<?php
header("Content-Type :application/json");
require "../controllers/UserController.php";


$usersController = new UserController();

$method = $_SERVER['REQUEST_METHOD'];
$url = $_SERVER['REQUEST_URI'];

$routes = [
    "GET" => function () use ($usersController) {
        $usersController->getUserbyRole();
    },
    "POST" => function () use ($usersController) {
        if (isset($_POST['email']) && isset($_POST['password'])) {
            $usersController->login();
        } else {
            $usersController->register();
        }
    }
    
];

if (array_key_exists($method, $routes)) {
    $routes[$method]();
}
