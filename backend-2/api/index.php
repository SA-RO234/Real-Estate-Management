<?php
// api/index.php

// ... (Includes, Autoloader, CORS, etc. - CHECK PREVIOUS FULL CODE) ...

// --- Use Statements ---
use Config\Database;
use Controllers\PropertyController;
use Controllers\MediaController; // <-- ADD THIS
use Api\ResponseHandler;

// ... (Database Connection) ...
try { $database = new Database(); $db = $database->connect(); if(!$db) throw new Exception(); }
catch (Exception $e) { ResponseHandler::error('Service Unavailable', 503); }

// --- Request Parsing & Routing ---
$request_method = $_SERVER['REQUEST_METHOD'];
$request_uri = $_SERVER['REQUEST_URI'];
// ... (Path parsing logic - CHECK PREVIOUS FULL CODE) ...
$script_name = $_SERVER['SCRIPT_NAME'];
$base_path = dirname($script_name);
if (strpos($request_uri, $script_name) === 0) { $path = substr($request_uri, strlen($script_name)); }
elseif ($base_path !== '/' && strpos($request_uri, $base_path) === 0) { $path = substr($request_uri, strlen($base_path)); }
else { $path = $request_uri; }
$path = parse_url($path, PHP_URL_PATH);
$path_parts = explode('/', trim($path, '/'));

// --- Route Definitions ---
$resource = $path_parts[0] ?? null;
$resource_id = isset($path_parts[1]) && is_numeric($path_parts[1]) ? (int)$path_parts[1] : null;
$sub_resource = $path_parts[2] ?? null; // <-- ADDED: For nested resources like 'media'
$sub_resource_id = isset($path_parts[3]) && is_numeric($path_parts[3]) ? (int)$path_parts[3] : null; // <-- ADDED

// --- Instantiate Controllers ---
$propertyController = new PropertyController($db);
$mediaController = new MediaController($db); // <-- ADD THIS

// --- Dispatch to Controller Method ---
try {
    if ($resource === 'properties') {
        if ($resource_id !== null) {
            // --- Routes under /properties/{id} ---
            if ($sub_resource === 'media') {
                 // --- Routes under /properties/{id}/media ---
                 if ($sub_resource_id !== null) {
                      // Routes like /properties/{id}/media/{media_id}
                      switch ($request_method) {
                          // case 'GET': $mediaController->show($resource_id, $sub_resource_id); break;
                          // case 'PUT': /* ... */ $mediaController->update($resource_id, $sub_resource_id, $data); break;
                          // case 'DELETE': $mediaController->destroy($resource_id, $sub_resource_id); break;
                          default: ResponseHandler::error('Method Not Allowed on this Media resource', 405); break;
                      }
                 } else {
                      // Routes like /properties/{id}/media
                      switch ($request_method) {
                           case 'POST':
                               // No JSON body needed for file upload, controller handles checking content type
                               $mediaController->store($resource_id);
                               break;
                           case 'GET': // <-- ADDED: List media for a property
                               $mediaController->index($resource_id);
                               break;
                           default: ResponseHandler::error('Method Not Allowed on Media Collection', 405); break;
                      }
                 }

            } else if ($sub_resource === null) {
                 // --- Routes directly on /properties/{id} ---
                 switch ($request_method) {
                      case 'GET': $propertyController->show($resource_id); break;
                      case 'PUT':
                            $data = json_decode(file_get_contents('php://input'), true);
                            if (json_last_error() !== JSON_ERROR_NONE || !is_array($data)) ResponseHandler::error('Bad Request: Invalid JSON.', 400);
                            $propertyController->update($resource_id, $data);
                            break;
                      case 'DELETE': $propertyController->destroy($resource_id); break;
                      default: ResponseHandler::error('Method Not Allowed on Property resource', 405); break;
                 }

            } else {
                  ResponseHandler::error('Not Found - Invalid sub-resource for property.', 404);
            }

        } else {
            // --- Routes on /properties (collection) ---
             switch ($request_method) {
                case 'GET': $propertyController->index($_GET); break; // Handles pagination params
                case 'POST':
                     $data = json_decode(file_get_contents('php://input'), true);
                     if (json_last_error() !== JSON_ERROR_NONE || !is_array($data)) ResponseHandler::error('Bad Request: Invalid JSON.', 400);
                     $propertyController->store($data);
                     break;
                default: ResponseHandler::error('Method Not Allowed on Properties collection', 405); break;
             }
        }
    } else {
        // Resource not 'properties'
        ResponseHandler::error('Not Found - Unknown Resource', 404);
    }

} catch (\Throwable $e) { // Catch any uncaught error or exception
     error_log("Unhandled API Error: " . $e->getMessage() . "\n" . $e->getTraceAsString());
     ResponseHandler::error('Internal Server Error occurred.', 500);
}
?>