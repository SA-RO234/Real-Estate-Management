<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
require "../controllers/UserController.php";
require_once "../core/Session.php";

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
            Session::Start();
            $user =  $usersController->login($input['email'] , $input['password']);
            if ($user) {
                Session::set('user_id', $user['id']);
                Session::set('email', $user['email']);
                //  Send session to fron-end 
                echo json_encode([
                    'message' => "Login Successfuly",
                    'session_id' => session_id(), // Send session ID
                    'user' => $user
                ]);
            }else{

                echo json_encode(['message'=> 'Invalid email or password.']);
            }
        } else {
            echo json_encode(["message" => "Invalid request: Missing required fields."]);
        }
    },
    "PUT" => function () use ($usersController) {
        $input = json_decode(file_get_contents("php://input"), true);
        if (!isset($_GET['id'])) {
            echo json_encode(["message" => "User ID is required."]);
            return;
        }
        $id = $_GET['id'];
        echo $id;
        $usersController->updateUser($id, $input);
    },

];
if (array_key_exists($method, $routes)) {
    $routes[$method]();
}
