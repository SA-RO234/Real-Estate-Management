<?php
class PropertyModel {
    private $conn;
    private $table_name = "properties";

    public function __construct($database) {
        $this->conn = $database;
    }

    // ✅ Retrieve all properties (with JOIN for location details)
    public function getAllProperties() {
        try {
            $query = "SELECT 
                        p.id,
                        p.user_id,
                        p.title,
                        p.description,
                        p.price,
                        p.bedrooms,
                        p.bathrooms,
                        p.square_feet,
                        p.lot_size,
                        p.year_built,
                        p.status,
                        p.listed_date,
                        p.hoa_fees,
                        p.location_id,
                        l.city,
                        l.country
                      FROM properties p
                      LEFT JOIN locations l ON p.location_id = l.id";
            
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt;
        } catch (PDOException $e) {
            die('Database Error: ' . $e->getMessage());
        }
    }

    // ✅ Retrieve a single property by ID
    public function getPropertyByID($id) {
        try {
            $stmt = $this->conn->prepare("SELECT * FROM properties WHERE id = ?");
            $stmt->execute([$id]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("Error retrieving property by ID: " . $e->getMessage());
            return false;
        }
    }
    

    // ✅ Insert a new property
    public function addProperty($title, $description, $price, $location_id, $user_id) {
        try {
            $query = "INSERT INTO properties 
                      (title, description, price, location_id, user_id) 
                      VALUES (?, ?, ?, ?, ?)";
            $stmt = $this->conn->prepare($query);
            return $stmt->execute([$title, $description, $price, $location_id, $user_id]);
        } catch (PDOException $e) {
            error_log("Add Property Error: " . $e->getMessage());
            return false;
        }
    }

    // ✅ Update an existing property
    public function updateProperty($id, $title, $description, $price, $location_id) {
        try {
            $query = "UPDATE properties 
                      SET title = ?, description = ?, price = ?, location_id = ?
                      WHERE id = ?";
            $stmt = $this->conn->prepare($query);
            return $stmt->execute([$title, $description, $price, $location_id, $id]);
        } catch (PDOException $e) {
            error_log("Update Property Error: " . $e->getMessage());
            return false;
        }
    }

    // ✅ Delete a property
    public function deleteProperty($id) {
        try {
            $stmt = $this->conn->prepare("DELETE FROM properties WHERE id = ?");
            $stmt->execute([$id]);
            return $stmt->rowCount() > 0;
        } catch (PDOException $e) {
            error_log("Delete Property Error: " . $e->getMessage());
            return false;
        }
    }
}
