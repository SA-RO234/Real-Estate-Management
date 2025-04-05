<?php
// models/Media.php
namespace Models;

use PDO;
use Exception;
use PDOException;

class Media {
    private PDO $conn;
    private string $table = 'media';

    // Properties matching table columns
    public ?int $id = null;
    public int $property_id; // Must be set
    public string $media_source_type = 'local'; // 'local' or 'url'
    public string $source_location; // Filename or URL
    public ?string $mime_type = null;
    public ?int $file_size = null;
    public ?string $caption = null;
    public bool $is_primary = false;
    public int $sort_order = 0;
    public ?string $created_at = null;
    public ?string $updated_at = null;

    // Upload specific properties (not in DB)
    public const UPLOAD_DIR = __DIR__ . '/../uploads/properties/'; // Relative to models directory

    public function __construct(PDO $db) {
        $this->conn = $db;
    }

    // Helper to ensure only one primary image per property
    private function ensureSinglePrimary(): void {
        if ($this->is_primary) {
            $query = 'UPDATE ' . $this->table . '
                      SET is_primary = 0
                      WHERE property_id = :property_id AND id != :id AND is_primary = 1';
            try {
                $stmt = $this->conn->prepare($query);
                $stmt->bindParam(':property_id', $this->property_id, PDO::PARAM_INT);
                // Bind the current ID only if it exists (on update), otherwise exclude the condition
                $currentId = $this->id ?? 0; // Use 0 if ID is not set (create case)
                $stmt->bindParam(':id', $currentId, PDO::PARAM_INT);
                $stmt->execute();
            } catch (PDOException $e) {
                error_log("Error resetting primary flag for property {$this->property_id}: " . $e->getMessage());
                // Decide if this should throw an exception or just log
                throw new Exception("Failed to update primary image status.");
            }
        }
    }


    /**
     * Creates a new media record. Handles ensuring single primary.
     * @return bool True on success
     * @throws Exception on validation or DB error
     */
    public function create(): bool {
        // Basic Validation
        if (empty($this->property_id) || empty($this->source_location) || empty($this->media_source_type)) {
            throw new \InvalidArgumentException('Missing required fields: property_id, source_location, media_source_type');
        }
        if (!in_array($this->media_source_type, ['local', 'url'])) {
             throw new \InvalidArgumentException('Invalid media_source_type.');
        }
        if ($this->media_source_type === 'url' && !filter_var($this->source_location, FILTER_VALIDATE_URL)) {
             throw new \InvalidArgumentException('Invalid URL format for source_location.');
        }


        // Transaction for atomicity (resetting primary + inserting)
        $this->conn->beginTransaction();

        try {
            // 1. Reset other primary flags if this one is set to primary
            $this->ensureSinglePrimary();

            // 2. Insert the new media record
            $query = 'INSERT INTO ' . $this->table . '
                      SET property_id = :property_id,
                          media_source_type = :media_source_type,
                          source_location = :source_location,
                          mime_type = :mime_type,
                          file_size = :file_size,
                          caption = :caption,
                          is_primary = :is_primary,
                          sort_order = :sort_order';

            $stmt = $this->conn->prepare($query);

            // Sanitize string inputs (basic)
            $this->caption = $this->caption ? htmlspecialchars(strip_tags($this->caption)) : null;
            $this->source_location = htmlspecialchars(strip_tags($this->source_location)); // Basic protection

            // Bind parameters
            $stmt->bindParam(':property_id', $this->property_id, PDO::PARAM_INT);
            $stmt->bindParam(':media_source_type', $this->media_source_type);
            $stmt->bindParam(':source_location', $this->source_location);
            $stmt->bindParam(':mime_type', $this->mime_type);
            $stmt->bindParam(':file_size', $this->file_size, $this->file_size === null ? PDO::PARAM_NULL : PDO::PARAM_INT);
            $stmt->bindParam(':caption', $this->caption);
            $stmt->bindParam(':is_primary', $this->is_primary, PDO::PARAM_BOOL);
            $stmt->bindParam(':sort_order', $this->sort_order, PDO::PARAM_INT);

            $stmt->execute();
            $this->id = (int)$this->conn->lastInsertId();

            // 3. Commit transaction
            $this->conn->commit();
            return true;

        } catch (Exception $e) {
            // Roll back transaction on error
            $this->conn->rollBack();
            error_log("Media Create Error (Property ID: {$this->property_id}): " . $e->getMessage());
            // Re-throw the exception or a more specific one
            throw $e; // Re-throw original exception to be caught by controller
        }
    }

    /**
     * Finds a single media item by its ID.
     * @return Media|null
     */
    public static function findById(PDO $db, int $id): ?self {
        $table = 'media';
        $query = 'SELECT * FROM ' . $table . ' WHERE id = :id LIMIT 1';
        try {
            $stmt = $db->prepare($query);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($row) {
                $media = new self($db);
                $media->id = (int)$row['id'];
                $media->property_id = (int)$row['property_id'];
                $media->media_source_type = $row['media_source_type'];
                $media->source_location = $row['source_location'];
                $media->mime_type = $row['mime_type'];
                $media->file_size = $row['file_size'] !== null ? (int)$row['file_size'] : null;
                $media->caption = $row['caption'];
                $media->is_primary = (bool)$row['is_primary'];
                $media->sort_order = (int)$row['sort_order'];
                $media->created_at = $row['created_at'];
                $media->updated_at = $row['updated_at'];
                return $media;
            }
            return null;
        } catch (PDOException $e) {
             error_log("Database Error in Media::findById for ID $id: " . $e->getMessage());
             throw new Exception("Could not retrieve media details.");
        }
    }

     /**
     * Finds all media items for a specific property ID.
     * @param PDO $db
     * @param int $propertyId
     * @return array<Media> Array of Media objects.
     */
     public static function findByPropertyId(PDO $db, int $propertyId): array {
        $table = 'media';
        $query = 'SELECT * FROM ' . $table . ' WHERE property_id = :property_id ORDER BY is_primary DESC, sort_order ASC, id ASC';
         try {
            $stmt = $db->prepare($query);
            $stmt->bindParam(':property_id', $propertyId, PDO::PARAM_INT);
            $stmt->execute();

            $mediaItems = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                 $media = new self($db);
                 $media->id = (int)$row['id'];
                 $media->property_id = (int)$row['property_id'];
                 $media->media_source_type = $row['media_source_type'];
                 $media->source_location = $row['source_location'];
                 $media->mime_type = $row['mime_type'];
                 $media->file_size = $row['file_size'] !== null ? (int)$row['file_size'] : null;
                 $media->caption = $row['caption'];
                 $media->is_primary = (bool)$row['is_primary'];
                 $media->sort_order = (int)$row['sort_order'];
                 $media->created_at = $row['created_at'];
                 $media->updated_at = $row['updated_at'];
                 $mediaItems[] = $media;
            }
            return $mediaItems;
        } catch (PDOException $e) {
             error_log("Database Error in Media::findByPropertyId for Property ID $propertyId: " . $e->getMessage());
             throw new Exception("Could not retrieve media items for property.");
        }
    }

    /**
     * Converts the media object's public properties to an associative array.
     * Includes a full URL path for local files.
     */
    public function toArray(): array {
        $source = $this->source_location;
        // Construct a basic public URL if it's a local file
        // WARNING: This assumes 'uploads' is accessible relative to the API base URL. Adjust as needed.
        if ($this->media_source_type === 'local' && !filter_var($source, FILTER_VALIDATE_URL)) {
             // This needs refinement based on your actual server setup and how you serve files
             // Example: Assuming uploads dir is parallel to api dir, and api is served at root
             $baseUrl = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/') . '/../uploads/properties/';
             // A more robust way would involve a configuration setting for the base URL
             // $baseUrl = 'http://' . $_SERVER['HTTP_HOST'] . '/uploads/properties/'; // Example hardcoded path
             $source = $baseUrl . $this->source_location;
        }

        return [
            'id' => $this->id,
            'property_id' => $this->property_id,
            'media_source_type' => $this->media_source_type,
            'source_location' => $source, // Use the potentially modified source URL
            'original_source' => $this->source_location, // Keep original value if needed
            'mime_type' => $this->mime_type,
            'file_size' => $this->file_size,
            'caption' => $this->caption,
            'is_primary' => $this->is_primary,
            'sort_order' => $this->sort_order,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }

    // --- Future methods for Update/Delete ---
    // public function update(): bool { /* ... similar to create ... */ }
    // public function delete(): bool { /* ... similar to Property delete ... */ }
}
?>