<?php
require "../../vendor/autoload.php";
require "../models/ChatModel.php";

use Pusher\Pusher;

class ChatController
{
    private $chatModel;
    public function __construct()
    {
        $this->chatModel = new ChatModel();
    }

    public function sendMessage()
    {
        $inputData = json_decode(file_get_contents('php://input'), true);

        if (!isset($inputData['sender_id'], $inputData['receiver_id'], $inputData['content'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid input data']);
            return;
        }


        $sender_id = $inputData['sender_id'];
        $receiver_id = $inputData['receiver_id'];
        $content  = $inputData['content'];

        $msgModel = new ChatModel();
        $msgModel->save($sender_id, $receiver_id, $content);
        $data = [
            'sender_id' => $sender_id,
            'receiver_id' => $receiver_id,
            'content' => $content,
        ];

        try {
            $pusher = new Pusher(
                getenv('PUSHER_APP_KEY'),
                getenv('PUSHER_APP_SECRET'),
                getenv('PUSHER_APP_ID'),
                ['cluster' => getenv('PUSHER_APP_CLUSTER'), 'useTLS' => true]
            );

            $pusher->trigger('chat-channel', 'new-message', $data);
        } catch (Exception $e) {
            error_log("Pusher failed: " . $e->getMessage());
        }

        echo json_encode(['status' => 'Message sent']);
    }

    //  get Chat messages 
    public function getChatMessages()
    {
        if (!isset($_GET['sender_id'], $_GET['receiver_id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing sender_id or receiver_id']);
            return;
        }

        $sender_id =  $_GET['sender_id'];
        $receiver_id = $_GET['receiver_id'];
        $msgModel = new ChatModel();
        $messages = $msgModel->fetchMessages($sender_id, $receiver_id);
        header('Content-Type: application/json');
        echo json_encode($messages);
    }

    //  Admin Send Message to Client 
    public function adminSendMessageToClient()
    {
        $inputData = json_decode(file_get_contents('php://input'), true);

        if (!isset($inputData['sender_id'], $inputData['receiver_id'], $inputData['content'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid input data']);
            return;
        }

        $admin_id = $inputData['sender_id'];
        $client_id = $inputData['receiver_id'];
        $content = $inputData['content'];

        $msgModel = new ChatModel();
        $msgModel->AdminSendMessagesToClientModel($admin_id, $client_id, $content);

        $data = [
            'sender_id' => $admin_id,
            'receiver_id' => $client_id,
            'content' => $content,
        ];

        try {
            $pusher = new Pusher(
                getenv('PUSHER_APP_KEY'),
                getenv('PUSHER_APP_SECRET'),
                getenv('PUSHER_APP_ID'),
                ['cluster' => getenv('PUSHER_APP_CLUSTER'), 'useTLS' => true]
            );

            $pusher->trigger('admin-chat-channel', 'new-admin-message', $data);
        } catch (Exception $e) {
            error_log("Pusher failed: " . $e->getMessage());
        }

        echo json_encode(['status' => 'Message sent']);
    }

    //  about admin get message from client
    public function adminGetMessagesFromClient()
    {
        if (!isset($_GET['sender_id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing admin_id']);
            return;
        }

        $admin_id = $_GET['sender_id'];
        $msgModel = new ChatModel();
        $messages = $msgModel->AdmingetMessagesFromClientModel($admin_id);

        header('Content-Type: application/json');
        echo json_encode($messages);
    }


    //  Get All Mesagae Detail from Client 
    public function getChatMessagesDetailFromClientController($admin_id, $client_id)
    {
        try {
            // Fetch message details from the model
            $messages = $this->chatModel->getAllMessagesDetailFromClient($admin_id, $client_id);
    
            // Format the data for the UI
            $formattedMessages = [];
            foreach ($messages as $message) {
                $formattedMessages[] = [
                    'id' => $message['id'],
                    'sender' => $message['sender_name'],
                    'content' => $message['content'],
                    'time' => $message['time'],
                    'avatar' => $message['sender_avatar'],
                    'sender_role' => $message['sender_role']
                ];
            }
    
            // Prepare the final response structure
            $response = [
                'id' => $client_id,
                'name' => $messages[0]['sender_name'] ?? 'Unknown',
                'avatar' => $messages[0]['sender_avatar'] ?? '/placeholder.svg',
                'lastMessage' => end($formattedMessages)['content'] ?? '',
                'time' => end($formattedMessages)['time'] ?? '',
                'isActive' => false, // Set this dynamically based on your logic
                'messages' => array_values($formattedMessages), // Ensure it's an array
            ];
    
            // Return the data as JSON for the front-end
            header('Content-Type: application/json');
            echo json_encode([
                'success' => true,
                'data' => $response
            ], JSON_FORCE_OBJECT);
        } catch (Exception $e) {
            // Handle errors and return an error response
            header('Content-Type: application/json');
            echo json_encode([
                'success' => false,
                'message' => $e->getMessage()
            ], JSON_FORCE_OBJECT);
        }
    }
}
