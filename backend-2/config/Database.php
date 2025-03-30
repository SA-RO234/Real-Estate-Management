<?php
// config/Database.php
namespace Config;

use PDO;
use PDOException;
use Exception;

class Database {
    private $host = "localhost";      // Your DB host
    private $db_name = "real_estate_db"; // Your DB name
    private $username = "root";       // Your DB username
    private $password = "";           // Your DB password
    private $conn;

    /**
     * Establishes and returns a PDO database connection.
     *
     * @return PDO|null The PDO connection object or null on failure before exception.
     * @throws Exception If connection fails.
     */
    public function connect(): ?PDO {
        $this->conn = null;
        $dsn = 'mysql:host=' . $this->host . ';dbname=' . $this->db_name . ';charset=utf8mb4';
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];

        try {
            $this->conn = new PDO($dsn, $this->username, $this->password, $options);
            return $this->conn;
        } catch(PDOException $e) {
            // Log the error securely in a real application
            error_log("Database Connection Error: " . $e->getMessage());
            // Re-throw a more generic exception for the API consumer
            throw new Exception("Database Service Unavailable.");
        }
    }
}
?>