<?php
require_once __DIR__ . "/../vendor/autoload.php";

use Dotenv\Dotenv;

// Load environment variables
$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();


class Database
{
    private $host;
    private $db_name;
    private $username;
    private $password;
    public $conn;

    public function __construct()
    {
        // Validate environment variables
        $this->host = getenv('DB_HOST') ?: throw new Exception('DB_HOST not set in environment variables');
        $this->db_name = getenv('DB_DATABASE') ?: throw new Exception('DB_DATABASE not set in environment variables');
        $this->username = getenv('DB_USERNAME') ?: throw new Exception('DB_USERNAME not set in environment variables');
        $this->password = getenv('DB_PASSWORD') ?: ''; // Password can be empty
    }

    public function getConnection()
    {
        $this->conn = null;
        try {
            $dsn = "mysql:host=" . $this->host . ";dbname=" . $this->db_name . ";charset=utf8mb4";
            $this->conn = new PDO($dsn, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        } catch (PDOException $exception) {
            // Log the error and rethrow it to stop execution
            error_log("Database connection error: " . $exception->getMessage());
            throw new Exception("Failed to connect to the database: " . $exception->getMessage());
        }
        return $this->conn;
    }
}

