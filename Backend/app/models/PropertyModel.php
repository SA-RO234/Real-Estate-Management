<?php
class PropertyModel{
    private $conn ;
    private $table_name = "properties";
    public $id;           // int, not null, auto_increment
    public $user_id;      // int, not null (renamed from $users_id)
    public $title;        // varchar(255), not null
    public $description;  // text, nullable
    public $price;        // decimal(12,2), not null
    public $bedrooms;     // int, nullable
    public $bathrooms;    // int, nullable
    public $square_feet;  // int, nullable
    public $lot_size;     // varchar(50), nullable
    public $year_built;   // int, nullable
    public $status;       // varchar(50), nullable
    public $listed_date;  // date, nullable (replacing $created_at)
    public $hoa_fees;     // decimal(10,2), nullable
    public $location_id;  // int, nullable (replacing $location)
    public $city;         // varchar(100), nullable (renamed from $location)
    public $country;      // varchar(100), nullable (renamed from $location)

    public function __construct($database){
        $this->conn = $database;
    }

    //   Retrieve all property from database 
    public function getAllproperties(){
        try {
             $query = "SELECT * FROM $this->table_name INNER JOIN locations ON properties.location_id = locations.id";
             $stmt = $this->conn->prepare($query);
             $stmt->execute();
            return $stmt;
        } catch (PDOException $e) {
            die('Database Error : '.$e->getMessage());
        }
       
    }

    

    //  Retrieve  a single property by id ;
    public function getPropertybyID ($id){
        try {
            global $conn;
            $stmt = $this->conn->prepare("SELECT * FROM  properties WHERE id = ?");
            $stmt->execute([$id]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e){
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
