<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require "../controllers/ChatController.php";


$requestMethod = $_SERVER['REQUEST_METHOD'];
$action = isset($_GET['action']) ? $_GET['action'] : null;

$chatController = new ChatController();

if ($requestMethod === 'POST' && $action === 'send-message') {
    $inputData = json_decode(file_get_contents('php://input'), true);

    if (is_array($inputData) && isset($inputData['sender_id'], $inputData['receiver_id'], $inputData['content'])) {
        $chatController->sendMessage();
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid input data']);
    }
} elseif ($requestMethod === 'GET' && $action === 'get-messages') {

    if (isset($_GET['sender_id'], $_GET['receiver_id'])) {
        $chatController->getChatMessages();
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Missing sender_id or receiver_id']);
    }
}elseif ($requestMethod === 'GET' && $action === 'admin-get-messages') {

    if (isset($_GET['sender_id'])) {
        $chatController->adminGetMessagesFromClient();
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Missing admin_id']);
    }
} elseif ($requestMethod === 'POST' && $action === 'admin-send-message') {
    
    $inputData = json_decode(file_get_contents('php://input'), true);

    if (is_array($inputData) && isset($inputData['sender_id'], $inputData['receiver_id'], $inputData['content'])) {
        $chatController->adminSendMessageToClient();
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid input data']);
    }
}elseif ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['admin_id']) && isset($_GET['client_id'])) {
    $admin_id = intval($_GET['admin_id']);
    $client_id = intval($_GET['client_id']);
    $chatController->getChatMessagesDetailFromClientController($admin_id, $client_id);
}else {
    http_response_code(404);
    echo json_encode(['error' => 'Endpoint not found']);
}
