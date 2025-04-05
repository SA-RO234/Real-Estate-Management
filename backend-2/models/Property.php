<?php
// models/Property.php
namespace Models;

use PDO;
use Exception; // Use base Exception
use PDOException; // Specific PDO Exception

// Custom exception for clarity, though not strictly necessary here
class PropertyNotFoundException extends Exception {}

class Property {
    private PDO $conn; // Type hint PDO connection
    private string $table = 'properties';

    // Public properties matching table columns (nullable where appropriate)
    public ?int $id = null;
    public ?string $address = null;
    public ?string $city = null;
    public ?string $state = null;
    public ?string $zip_code = null;
    public ?float $price = null;
    public ?int $bedrooms = null;
    public ?float $bathrooms = null; // Allows for 2.5 etc.
    public ?int $square_footage = null;
    public ?string $property_type = 'Single Family'; // Default value
    public ?string $status = 'For Sale'; // Default value
    public ?string $description = null;
    public ?string $created_at = null;
    public ?string $updated_at = null;

    public function __construct(PDO $db) {
        $this->conn = $db;
    }

    // Basic sanitization - enhance as needed
    private function sanitize(): void {
        $this->address = $this->address ? htmlspecialchars(strip_tags($this->address)) : null;
        $this->city = $this->city ? htmlspecialchars(strip_tags($this->city)) : null;
        $this->state = $this->state ? htmlspecialchars(strip_tags($this->state)) : null;
        $this->zip_code = $this->zip_code ? htmlspecialchars(strip_tags($this->zip_code)) : null;
        $this->property_type = $this->property_type ? htmlspecialchars(strip_tags($this->property_type)) : null;
        $this->status = $this->status ? htmlspecialchars(strip_tags($this->status)) : null;
        $this->description = $this->description ? htmlspecialchars(strip_tags($this->description)) : null;

        // Use filter_var for numeric types (already handled by PDO bind types, but good practice)
        $this->price = $this->price !== null ? filter_var($this->price, FILTER_VALIDATE_FLOAT) : null;
        $this->bedrooms = $this->bedrooms !== null ? filter_var($this->bedrooms, FILTER_VALIDATE_INT) : null;
        $this->bathrooms = $this->bathrooms !== null ? filter_var($this->bathrooms, FILTER_VALIDATE_FLOAT) : null;
        $this->square_footage = $this->square_footage !== null ? filter_var($this->square_footage, FILTER_VALIDATE_INT) : null;
    }

    /**
     * Counts the total number of properties.
     */
    public static function countAll(PDO $db): int {
        $table = 'properties'; // Need table name in static method
        $query = 'SELECT COUNT(*) FROM ' . $table;
        try {
            $stmt = $db->query($query); // Simple query, no need to prepare
            return (int)$stmt->fetchColumn();
        } catch (PDOException $e) {
            error_log("Database Error in countAll: " . $e->getMessage());
            throw new Exception("Could not count properties."); // Re-throw generic
        }
    }

    /**
     * Finds all properties with pagination.
     * @return array<Property> Array of Property objects.
     */
    public static function findAll(PDO $db, int $page = 1, int $pageSize = 10): array {
        $table = 'properties';
        $page = max(1, $page);
        $pageSize = max(1, $pageSize);
        $offset = ($page - 1) * $pageSize;
        $limit = $pageSize; // Renamed for clarity in SQL

        $query = 'SELECT * FROM ' . $table . ' ORDER BY created_at DESC LIMIT :limit OFFSET :offset';

        try {
            $stmt = $db->prepare($query);
            $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
            $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
            $stmt->execute();

            $properties = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $property = new self($db);
                $property->id = (int)$row['id'];
                $property->address = $row['address'];
                $property->city = $row['city'];
                $property->state = $row['state'];
                $property->zip_code = $row['zip_code'];
                $property->price = (float)$row['price'];
                $property->bedrooms = $row['bedrooms'] !== null ? (int)$row['bedrooms'] : null;
                $property->bathrooms = $row['bathrooms'] !== null ? (float)$row['bathrooms'] : null;
                $property->square_footage = $row['square_footage'] !== null ? (int)$row['square_footage'] : null;
                $property->property_type = $row['property_type'];
                $property->status = $row['status'];
                $property->description = $row['description'];
                $property->created_at = $row['created_at'];
                $property->updated_at = $row['updated_at'];
                $properties[] = $property;
            }
            return $properties;
        } catch (PDOException $e) {
            error_log("Database Error in findAll: " . $e->getMessage());
            throw new Exception("Could not retrieve properties list.");
        }
    }

    /**
     * Finds a single property by its ID.
     * @return Property|null Property object if found, null otherwise.
     */
    public static function findById(PDO $db, int $id): ?self {
        $table = 'properties';
        $query = 'SELECT * FROM ' . $table . ' WHERE id = :id LIMIT 1';
        try {
            $stmt = $db->prepare($query);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($row) {
                $property = new self($db);
                // Map row data to object properties (same mapping as in findAll)
                $property->id = (int)$row['id'];
                $property->address = $row['address'];
                $property->city = $row['city'];
                $property->state = $row['state'];
                $property->zip_code = $row['zip_code'];
                $property->price = (float)$row['price'];
                $property->bedrooms = $row['bedrooms'] !== null ? (int)$row['bedrooms'] : null;
                $property->bathrooms = $row['bathrooms'] !== null ? (float)$row['bathrooms'] : null;
                $property->square_footage = $row['square_footage'] !== null ? (int)$row['square_footage'] : null;
                $property->property_type = $row['property_type'];
                $property->status = $row['status'];
                $property->description = $row['description'];
                $property->created_at = $row['created_at'];
                $property->updated_at = $row['updated_at'];
                return $property;
            }
            return null; // Not found
        } catch (PDOException $e) {
             error_log("Database Error in findById for ID $id: " . $e->getMessage());
             throw new Exception("Could not retrieve property details.");
        }
    }

    /**
     * Creates a new property record in the database using the object's properties.
     * @return bool True on success.
     * @throws \InvalidArgumentException If required fields are missing.
     * @throws Exception If database error occurs.
     */
    public function create(): bool {
        if (empty($this->address) || empty($this->city) || empty($this->state) || empty($this->zip_code) || $this->price === null) {
            throw new \InvalidArgumentException('Missing required fields: address, city, state, zip_code, price');
        }

        $query = 'INSERT INTO ' . $this->table . '
                  SET address = :address, city = :city, state = :state, zip_code = :zip_code,
                      price = :price, bedrooms = :bedrooms, bathrooms = :bathrooms,
                      square_footage = :square_footage, property_type = :property_type,
                      status = :status, description = :description';

        try {
            $stmt = $this->conn->prepare($query);
            $this->sanitize(); // Sanitize before binding

            // Bind parameters using current object properties
            $stmt->bindParam(':address', $this->address);
            $stmt->bindParam(':city', $this->city);
            $stmt->bindParam(':state', $this->state);
            $stmt->bindParam(':zip_code', $this->zip_code);
            $stmt->bindParam(':price', $this->price); // PDO handles float
            $stmt->bindParam(':bedrooms', $this->bedrooms, $this->bedrooms === null ? PDO::PARAM_NULL : PDO::PARAM_INT);
            $stmt->bindParam(':bathrooms', $this->bathrooms); // PDO generally handles float/null okay
            $stmt->bindParam(':square_footage', $this->square_footage, $this->square_footage === null ? PDO::PARAM_NULL : PDO::PARAM_INT);
            $stmt->bindParam(':property_type', $this->property_type);
            $stmt->bindParam(':status', $this->status);
            $stmt->bindParam(':description', $this->description, $this->description === null ? PDO::PARAM_NULL : PDO::PARAM_STR);

            if ($stmt->execute()) {
                $this->id = (int)$this->conn->lastInsertId(); // Update object's ID
                return true;
            }
            return false; // Should not be reached if exceptions are on
        } catch (PDOException $e) {
            error_log("Database Error in create: " . $e->getMessage() . " - Data: " . json_encode($this->toArray()));
            throw new Exception("Error creating property: Database error."); // More specific message?
        }
    }

    /**
     * Updates the property record in the database using the object's current properties.
     * Assumes the object's ID is set.
     * @return bool True if rows were affected, false otherwise.
     * @throws Exception If ID is not set or database error occurs.
     */
    public function update(): bool {
        if ($this->id === null) {
            throw new Exception("Cannot update property without an ID.");
        }

        $query = 'UPDATE ' . $this->table . '
                  SET address = :address, city = :city, state = :state, zip_code = :zip_code,
                      price = :price, bedrooms = :bedrooms, bathrooms = :bathrooms,
                      square_footage = :square_footage, property_type = :property_type,
                      status = :status, description = :description
                  WHERE id = :id';

        try {
            $stmt = $this->conn->prepare($query);
            $this->sanitize(); // Sanitize before binding

            // Bind parameters
            $stmt->bindParam(':id', $this->id, PDO::PARAM_INT);
            $stmt->bindParam(':address', $this->address);
            $stmt->bindParam(':city', $this->city);
            $stmt->bindParam(':state', $this->state);
            $stmt->bindParam(':zip_code', $this->zip_code);
            $stmt->bindParam(':price', $this->price);
            $stmt->bindParam(':bedrooms', $this->bedrooms, $this->bedrooms === null ? PDO::PARAM_NULL : PDO::PARAM_INT);
            $stmt->bindParam(':bathrooms', $this->bathrooms);
            $stmt->bindParam(':square_footage', $this->square_footage, $this->square_footage === null ? PDO::PARAM_NULL : PDO::PARAM_INT);
            $stmt->bindParam(':property_type', $this->property_type);
            $stmt->bindParam(':status', $this->status);
            $stmt->bindParam(':description', $this->description, $this->description === null ? PDO::PARAM_NULL : PDO::PARAM_STR);

            $stmt->execute();
            return $stmt->rowCount() > 0; // Return true if update affected rows

        } catch (PDOException $e) {
             error_log("Database Error in update for ID {$this->id}: " . $e->getMessage() . " - Data: " . json_encode($this->toArray()));
             throw new Exception("Error updating property: Database error.");
        }
    }

    /**
     * Deletes the property record from the database using the object's ID.
     * @return bool True if a row was deleted, false otherwise.
     * @throws Exception If ID is not set or database error occurs.
     */
    public function delete(): bool {
         if ($this->id === null) {
            throw new Exception("Cannot delete property without an ID.");
        }
        $query = 'DELETE FROM ' . $this->table . ' WHERE id = :id';
        try {
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id', $this->id, PDO::PARAM_INT);
            $stmt->execute();
            return $stmt->rowCount() > 0; // True if a row was deleted
        } catch (PDOException $e) {
            error_log("Database Error in delete for ID {$this->id}: " . $e->getMessage());
            throw new Exception("Error deleting property: Database error.");
        }
    }

    /**
     * Converts the property object's public properties to an associative array.
     */
    public function toArray(): array {
        // Use get_object_vars only for public properties or define manually
        return [
            'id' => $this->id,
            'address' => $this->address,
            'city' => $this->city,
            'state' => $this->state,
            'zip_code' => $this->zip_code,
            'price' => $this->price,
            'bedrooms' => $this->bedrooms,
            'bathrooms' => $this->bathrooms,
            'square_footage' => $this->square_footage,
            'property_type' => $this->property_type,
            'status' => $this->status,
            'description' => $this->description,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
?>