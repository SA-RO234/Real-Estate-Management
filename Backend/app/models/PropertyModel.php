<?php
class PropertyModel{
    private $conn ;
    private $table_name = "properties";
    public $id;
    public $title;
    public $price;
    public $description;
    public $location;
    public $created_at;
    public $saller_id;
    public $status;

    public function __construct($database){
        $this->conn = $database;
    }


    //   Retrieve all property from database 
    public function getAllproperties(){
        try {
             $query = "SELECT * FROM properties";
             $stmt = $this->conn->prepare($query);
             $stmt->execute();
            return $stmt;
        } catch (PDOException $e) {
            die('Database Error : '.$e->getMessage());
        }
       
    }

    //  Retrieve  a single property by id ;
    public function getPropertybyID ($id){
         global $conn;
        if (!$conn) {
            error_log("Database connection is not initialized.");
            return false;
        }
        try {
            echo ("Hello");
            $stmt = $this->conn->prepare("SELECT * FROM properties WHERE id = ?");
            $stmt->execute([$id]);
            
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("Error retrieving property by ID: " . $e->getMessage());
            return false;
        }
    }

    //  Insert a new property into database 
   public function addProperty($title, $description, $price, $location){
        $query = "INSERT INTO properties (title, description, price, location) VALUES (?, ?, ?, ?)";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([$title, $description, $price, $location]);
    }

    // Update an existing property
    public function updateProperty($id, $title, $description, $price, $location){
        global $conn;
        $stmt = $conn->prepare("UPDATE properties SET title = ?, description = ?, price = ?, location = ? WHERE id = ?");
        $stmt->execute([$title, $description, $price, $location, $id]);
    }

    // Delete a property
    public function deleteProperty($id){
        try {
            $stmt = $this->conn->prepare("DELETE FROM properties WHERE id = ?");
            $stmt->execute([$id]);

            if ($stmt->rowCount() > 0) {
                return true;
            } else {
                return false;
            }
        } catch (PDOException $e) {
            error_log("Delete Property Error: " . $e->getMessage());
            return false;
        }
    }
}
