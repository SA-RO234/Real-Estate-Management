<?php

require_once '../../config/database.php';

class PropertyModel{
    public $conn ;
    public function __construct(Database $database){
        $this->conn = $database->getConnection();
    }
    //   Retrieve all property from database 
    public function getAllproperties(){
        global $conn;
        $stmt  = $conn->query("SELECT * FROM properties");
        return $stmt->fetchall(PDO::FETCH_ASSOC);
    }

    //  Retrieve  a single property by id ;
    public function getPropertybyID ($id){
         global $conn;
         $stmt = $conn->prepare("SELECT * FROM properties WHERE id = ? ");
         $stmt->bind_param("i",$id);
         $stmt->execute();
         return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    //  Insert a new property into database 
    public function addProperty($title, $description, $price, $location){
        global $conn;
        $stmt = $conn->prepare("INSERT INTO properties (title, description, price, location) VALUES (?, ?, ?, ?)");
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
        global $conn;
        $stmt = $conn->prepare("DELETE FROM properties WHERE id = ?");
        $stmt->execute([$id]);
    }
}
