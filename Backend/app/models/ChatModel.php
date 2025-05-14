<?php


require "../../config/database.php";
class ChatModel
{
    private $db;
    public function __construct()
    {
        $database = new Database();
        $this->db = $database->getConnection();
    }
    public function save($sender_id, $receiver_id, $content)
    {
        $stmt = $this->db->prepare("INSERT INTO messages (sender_id, receiver_id , content) VALUES (?, ? , ?)");
        $stmt->execute([$sender_id, $receiver_id, $content]);
    }

    public function fetchMessages($sender_id, $receiver_id)
    {
        $stmt = $this->db->prepare("
            SELECT *
            FROM messages
            WHERE (sender_id = ? AND receiver_id = ?)
               OR (sender_id = ? AND receiver_id = ?)
            ORDER BY sent_at ASC
        ");

        $stmt->execute([$sender_id, $receiver_id, $receiver_id, $sender_id]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    //  Admin-get Messsage from client
    public function AdmingetMessagesFromClientModel($admin_id)
    {
        $stmt = $this->db->prepare("
         SELECT messages.id, users.name AS sender_name,
                users.avatar,messages.content AS preview,
                messages.sent_at,messages.is_read ,
                messages.sender_id , messages.receiver_id ,
                messages.is_Active
         FROM messages
         JOIN users ON messages.sender_id = users.id
         WHERE messages.receiver_id = :admin_id
         ORDER BY messages.sent_at DESC;
        ");
        $stmt->bindParam(':admin_id', $admin_id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    // Admin  Send message to client
    public function AdminSendMessagesToClientModel($admin_id, $client_id, $content)
    {
        $stmt = $this->db->prepare("
        INSERT INTO messages (sender_id, receiver_id, content)VALUES (:admin_id, :client_id, :content)");
        $stmt->bindParam(':admin_id', $admin_id, PDO::PARAM_INT);
        $stmt->bindParam(':client_id', $client_id, PDO::PARAM_INT);
        $stmt->bindParam(':content', $content, PDO::PARAM_STR);
        $stmt->execute();
    }

    //  Get ALl MessageDetail from Client
    public function getAllMessagesDetailFromClient($admin_id, $client_id)
    {
        $stmt = $this->db->prepare("
        SELECT messages.id, messages.content, messages.sent_at AS time,
               sender.name AS sender_name, sender.avatar AS sender_avatar, sender.role AS sender_role ,
               receiver.name AS receiver_name, receiver.avatar AS receiver_avatar, receiver.role AS receiver_role ,
               messages.is_Active 
        FROM messages
        JOIN users AS sender ON messages.sender_id = sender.id
        JOIN users AS receiver ON messages.receiver_id = receiver.id
        WHERE (messages.sender_id = :client_id AND messages.receiver_id = :admin_id)
           OR (messages.sender_id = :admin_id AND messages.receiver_id = :client_id)
        ORDER BY messages.sent_at ASC
    ");

        $stmt->bindParam(':admin_id', $admin_id, PDO::PARAM_INT);
        $stmt->bindParam(':client_id', $client_id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
