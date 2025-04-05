<?php
// api/ResponseHandler.php
namespace Api;

class ResponseHandler {

    /**
     * Sends a JSON response with appropriate headers.
     *
     * @param mixed $data Data to encode.
     * @param int $statusCode HTTP status code.
     */
    public static function json($data, int $statusCode = 200): void {
        if (!headers_sent()) {
            // Set CORS headers here or in index.php - doing it here ensures they are always set for API responses
            header('Access-Control-Allow-Origin: *'); // Be more specific in production!
            header('Content-Type: application/json; charset=UTF-8');
            http_response_code($statusCode);
        }
        echo json_encode($data);
        exit(); // Terminate after sending response
    }

     /**
     * Sends a standardized JSON error response.
     *
     * @param string $message Error message.
     * @param int $statusCode HTTP status code.
     */
     public static function error(string $message, int $statusCode): void {
        self::json(['message' => $message], $statusCode);
    }
}
?>