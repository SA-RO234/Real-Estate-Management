<?php
// controllers/PropertyController.php
namespace Controllers;

use PDO;
use Models\Property;
use Models\PropertyNotFoundException; // If using custom exception
use Api\ResponseHandler;
use InvalidArgumentException;
use Exception; // Base Exception class

class PropertyController {
    private PDO $db; // Type hint
    private const DEFAULT_PAGE_SIZE = 10; // Default items per page
    private const MAX_PAGE_SIZE = 100;    // Max items per page

    public function __construct(PDO $db) {
        $this->db = $db;
    }

    /**
     * GET /properties - Handles listing properties with pagination.
     * Expects optional query params: ?page=N&pageSize=M
     * @param array $queryParams Parsed query string parameters.
     */
    public function index(array $queryParams = []): void {
        $currentPage = isset($queryParams['page']) ? filter_var($queryParams['page'], FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]) : 1;
        $currentPage = $currentPage ?: 1; // Ensure it's at least 1

        $pageSize = isset($queryParams['pageSize']) ? filter_var($queryParams['pageSize'], FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]) : self::DEFAULT_PAGE_SIZE;
        $pageSize = $pageSize ?: self::DEFAULT_PAGE_SIZE; // Ensure valid or default
        $pageSize = min($pageSize, self::MAX_PAGE_SIZE); // Enforce max page size

        try {
            $totalItems = Property::countAll($this->db);
            $properties = Property::findAll($this->db, $currentPage, $pageSize);
            $totalPages = ($totalItems > 0 && $pageSize > 0) ? ceil($totalItems / $pageSize) : 0;

            // Ensure currentPage isn't out of bounds after potential deletions
            if ($currentPage > $totalPages && $totalPages > 0) {
                 $currentPage = (int)$totalPages;
                 // Optionally re-fetch data for the last page
                 $properties = Property::findAll($this->db, $currentPage, $pageSize);
            }


            $propertiesData = array_map(fn(Property $prop) => $prop->toArray(), $properties);

            $response = [
                'data' => $propertiesData,
                'pagination' => [
                    'currentPage' => $currentPage,
                    'pageSize' => $pageSize,
                    'totalPages' => (int)$totalPages,
                    'totalItems' => $totalItems,
                ]
            ];
            ResponseHandler::json($response);

        } catch (Exception $e) {
            error_log("Controller Error (index): " . $e->getMessage());
            ResponseHandler::error('Could not retrieve properties.', 500);
        }
    }

    /**
     * GET /properties/{id} - Handles fetching a single property.
     */
    public function show(int $id): void {
        try {
            $property = Property::findById($this->db, $id);
            if ($property) {
                ResponseHandler::json($property->toArray());
            } else {
                ResponseHandler::error('Property Not Found', 404);
            }
        } catch (Exception $e) {
            error_log("Controller Error (show ID: $id): " . $e->getMessage());
            ResponseHandler::error('Could not retrieve property details.', 500);
        }
    }

    /**
     * POST /properties - Handles creating a new property.
     */
    public function store(array $data): void {
        $property = new Property($this->db);
        // Assign validated/sanitized data (Model should handle internal sanitation)
        $property->address = $data['address'] ?? null;
        $property->city = $data['city'] ?? null;
        $property->state = $data['state'] ?? null;
        $property->zip_code = $data['zip_code'] ?? null;
        $property->price = isset($data['price']) ? (float)$data['price'] : null;
        $property->bedrooms = isset($data['bedrooms']) ? (int)$data['bedrooms'] : null;
        $property->bathrooms = isset($data['bathrooms']) ? (float)$data['bathrooms'] : null;
        $property->square_footage = isset($data['square_footage']) ? (int)$data['square_footage'] : null;
        $property->property_type = $data['property_type'] ?? null; // Let model use default if null
        $property->status = $data['status'] ?? null; // Let model use default if null
        $property->description = $data['description'] ?? null;

        try {
            if ($property->create()) {
                // Fetch the complete record to include generated fields (ID, timestamps)
                $newProperty = Property::findById($this->db, $property->id);
                if ($newProperty) {
                     ResponseHandler::json(
                        ['message' => 'Property Created', 'data' => $newProperty->toArray()],
                        201 // HTTP 201 Created
                    );
                } else {
                     // Should ideally not happen if create() succeeded, but handle defensively
                     ResponseHandler::error('Property Created, but failed to retrieve details.', 500);
                }
            }
            // create() should throw exception on failure, so no else needed here ideally
        } catch (InvalidArgumentException $e) {
            ResponseHandler::error('Bad Request: ' . $e->getMessage(), 400);
        } catch (Exception $e) {
            error_log("Controller Error (store): " . $e->getMessage());
            ResponseHandler::error('Internal Server Error: Could not create property.', 500);
        }
    }

    /**
     * PUT /properties/{id} - Handles updating an existing property.
     */
    public function update(int $id, array $data): void {
         try {
            $property = Property::findById($this->db, $id);
            if (!$property) {
                ResponseHandler::error('Property Not Found', 404);
            }

            // Update only fields present in $data (Partial Update / PATCH-like)
            if(isset($data['address'])) $property->address = $data['address'];
            if(isset($data['city'])) $property->city = $data['city'];
            if(isset($data['state'])) $property->state = $data['state'];
            if(isset($data['zip_code'])) $property->zip_code = $data['zip_code'];
            if(isset($data['price'])) $property->price = (float)$data['price'];
            if(isset($data['bedrooms'])) $property->bedrooms = (int)$data['bedrooms'];
            if(isset($data['bathrooms'])) $property->bathrooms = (float)$data['bathrooms'];
            if(isset($data['square_footage'])) $property->square_footage = (int)$data['square_footage'];
            if(isset($data['property_type'])) $property->property_type = $data['property_type'];
            if(isset($data['status'])) $property->status = $data['status'];
            // Use array_key_exists to allow setting description to null or empty string
            if(array_key_exists('description', $data)) $property->description = $data['description'];

            if ($property->update()) {
                 $updatedProperty = Property::findById($this->db, $id); // Re-fetch to get updated timestamp etc.
                 ResponseHandler::json(
                    ['message' => 'Property Updated', 'data' => $updatedProperty->toArray()]
                 );
            } else {
                // No rows affected - likely data was the same or ID didn't exist (already checked)
                 ResponseHandler::json(
                    ['message' => 'Property Update requested, but no data was changed.', 'data' => $property->toArray()]
                 );
            }
        } catch (InvalidArgumentException $e) { // Might be thrown by model setters later
            ResponseHandler::error('Bad Request: ' . $e->getMessage(), 400);
        } catch (Exception $e) {
            error_log("Controller Error (update ID: $id): " . $e->getMessage());
            ResponseHandler::error('Internal Server Error: Could not update property.', 500);
        }
    }

     /**
     * DELETE /properties/{id} - Handles deleting a property.
     */
    public function destroy(int $id): void {
        try {
            $property = Property::findById($this->db, $id); // Check existence first
            if (!$property) {
                ResponseHandler::error('Property Not Found', 404);
            }

            if ($property->delete()) {
                 // Success, no content to return
                 http_response_code(204);
                 exit();
                 // OR: ResponseHandler::json(['message' => 'Property Deleted', 'id' => $id]);
            }
            // delete() throws exception on failure, so no else needed
        } catch (Exception $e) {
            error_log("Controller Error (destroy ID: $id): " . $e->getMessage());
            ResponseHandler::error('Internal Server Error: Could not delete property.', 500);
        }
    }
}
?>