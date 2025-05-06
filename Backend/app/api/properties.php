<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type : application/json"); // Ensure response is json 
header("Access-Control-Allow-Method : GET , POST ,PUT, DELETE");

require_once "../controllers/PropertyController.php";
require_once "../../config/database.php";



$properTyController = new PropertyController();
$method = $_SERVER["REQUEST_METHOD"];
$request = json_decode(file_get_contents("php://input"), true);

$routes = [
    'GET' => function () use ($properTyController) {
        if (isset($_GET['id'])) {
            $properTyController->getPropertyById($_GET['id']);
        } else {
            $properTyController->getProperties();
        }
    },
    'POST' => function () use ($properTyController) {
        $properTyController->addProperty();
    },
    'PUT' => function () use ($properTyController) {
        $properTyController->updateProperty();
    },
    'DELETE' => function () use ($properTyController) {
        $properTyController->deleteProperty();
    }
];


if (array_key_exists($method, $routes)) {
    $routes[$method]();
} else {
    echo json_encode(["message" => "Invalid HTTP Method ! "]);
}
