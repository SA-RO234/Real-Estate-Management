<?php
require_once '../models/PropertyModel.php';
require_once '../../config/database.php';
header("Content-Type: application/json"); // Ensure JSON response


class PropertyController{
    private $property;
    public function __construct(){
        $database = new Database();
        $db = $database->getConnection();
        $this->property = new PropertyModel($db);
    }

    // Handle GET Request for all property
    // Controller Method to Handle GET Request for All Properties
    public function getProperties(){
        try {
            $stmt = $this->property->getAllProperties();
            $num  = $stmt->rowCount();

            if ($num > 0) {
                $properties_arr = array();
                $properties_arr = array();

                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);
                    $property_item = array(
                        "id" => $id,
                        "title" => $title,
                        "price" => $price,
                        "location" => $location,
                        "description" => $description,
                        "saller_id" => $saller_id,
                        "status" => $status,
                        "created_at" => $created_at
                    );
                    array_push($properties_arr, $property_item);
                }
                echo json_encode($properties_arr, JSON_PRETTY_PRINT);
            } else {
                echo json_encode(array("message" => "No Properties Found."));
            }
        } catch (Exception $e) {
            echo json_encode(array("error" => $e->getMessage()));
        }
    }


    // Handle GET request for a single property by ID
    public function getPropertyById($id){
        $id = (int)$id;
        $properties = $this->property->getPropertyById($id);
        if ($properties) {
            echo json_encode($properties);  // Return property data in JSON format
        } else {
            echo json_encode(["message" => "Property not found."]);
        }
    }

    // //   Handle  POST request to add new property 
    public function addProperty(){
        $data = json_decode(file_get_contents("php://input"), true); // get data from request body
        $this->property->addProperty($data['title'], $data['description'], $data['price'], $data['location']);
        echo json_encode(["message" => "Property added successfully ! "]);
    }

    // //  Handle PUT request to update a property 
    public function updateProperty(){
        $data = json_decode(file_get_contents('php://input'), true);
        $this->property->updateProperty($data['id'], $data['title'], $data['description'], $data['price'], $data['location']);
        echo json_encode(['message' => "Property Updated Successfuly ! "]);
    }

    // //  Handle DELETE request to delete for property 
    public function deleteProperty(){
        // Get JSON input and decode it
        $data = json_decode(file_get_contents('php://input'), true);
      
        // Check if the data is valid and contains an ID
        if (!isset($data['id'])) {
            echo json_encode(['error' => "Property ID is required."]);
            http_response_code(400); // Bad Request
            return;
        }
          $id = intval($_GET['id']);
          echo("ID : ".$id);
        // Attempt to delete the property
        if ($this->property->deleteProperty($id)) {
            echo json_encode(['message' => "Property deleted successfully!"]);
            http_response_code(200); // OK
        } else {
            echo json_encode(['error' => "Failed to delete property."]);
            http_response_code(500); // Internal Server Error
        }
    }
}
