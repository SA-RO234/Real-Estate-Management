<?php
// controllers/MediaController.php
namespace Controllers;

use PDO;
use Models\Media;
use Models\Property; // To verify property exists
use Api\ResponseHandler;
use InvalidArgumentException;
use Exception;

class MediaController {
    private PDO $db;
    private const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
    private const ALLOWED_MIME_TYPES = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp'
    ];

    public function __construct(PDO $db) {
        $this->db = $db;
    }

    /**
     * POST /properties/{propertyId}/media
     * Stores a new media item (uploaded file or URL) for a property.
     */
    public function store(int $propertyId): void {
        // 1. Verify Property Exists
        try {
            if (!Property::findById($this->db, $propertyId)) {
                ResponseHandler::error('Property Not Found', 404);
            }
        } catch (Exception $e) {
             ResponseHandler::error('Error verifying property: ' . $e->getMessage(), 500);
        }

        // 2. Determine request type (JSON for URL, FormData for Upload)
        $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
        $isJsonRequest = stripos($contentType, 'application/json') !== false;
        $isFormDataRequest = stripos($contentType, 'multipart/form-data') !== false;

        $media = new Media($this->db);
        $media->property_id = $propertyId;

        try {
            if ($isJsonRequest) {
                // --- Handle URL Submission ---
                $data = json_decode(file_get_contents('php://input'), true);
                if (json_last_error() !== JSON_ERROR_NONE || !is_array($data)) {
                   throw new InvalidArgumentException('Invalid JSON payload.');
                }

                $media->media_source_type = 'url';
                $media->source_location = $data['source_location'] ?? ''; // Validation in model
                $media->caption = $data['caption'] ?? null;
                $media->is_primary = filter_var($data['is_primary'] ?? false, FILTER_VALIDATE_BOOLEAN);
                $media->sort_order = isset($data['sort_order']) ? (int)$data['sort_order'] : 0;

                // Model's create method handles validation and DB insertion

            } elseif ($isFormDataRequest) {
                // --- Handle File Upload ---
                if (empty($_FILES['mediaFile'])) {
                    throw new InvalidArgumentException('No file uploaded in "mediaFile" field.');
                }

                $file = $_FILES['mediaFile'];

                // Check for upload errors
                if ($file['error'] !== UPLOAD_ERR_OK) {
                    throw new Exception('File upload error: ' . $this->uploadErrorMessage($file['error']));
                }

                // Validate File Size
                if ($file['size'] > self::MAX_FILE_SIZE) {
                     throw new InvalidArgumentException('File exceeds maximum size limit (' . (self::MAX_FILE_SIZE / 1024 / 1024) . ' MB).');
                }

                // Validate MIME Type (using finfo for reliability)
                $finfo = finfo_open(FILEINFO_MIME_TYPE);
                $mimeType = finfo_file($finfo, $file['tmp_name']);
                finfo_close($finfo);

                if (!in_array($mimeType, self::ALLOWED_MIME_TYPES)) {
                    throw new InvalidArgumentException('Invalid file type. Allowed types: ' . implode(', ', self::ALLOWED_MIME_TYPES));
                }

                // Generate Unique Filename & Path
                $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
                $safeOriginalName = preg_replace("/[^a-zA-Z0-9-_\.]/", "", basename($file['name'])); // Basic sanitize
                $uniqueFilename = uniqid('prop_' . $propertyId . '_', true) . '.' . $extension;
                // Use absolute path based on Media Model's constant
                $targetPath = Media::UPLOAD_DIR . $uniqueFilename;

                // Ensure upload directory exists and is writable
                 if (!is_dir(Media::UPLOAD_DIR)) {
                    if (!mkdir(Media::UPLOAD_DIR, 0775, true)) { // Create recursively with permissions
                         throw new Exception("Failed to create upload directory.");
                    }
                 }
                 if (!is_writable(Media::UPLOAD_DIR)) {
                     throw new Exception("Upload directory is not writable.");
                 }


                // Move Uploaded File
                if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
                    throw new Exception('Failed to move uploaded file.');
                }

                // Set Media Model Properties
                $media->media_source_type = 'local';
                $media->source_location = $uniqueFilename; // Store only the filename
                $media->mime_type = $mimeType;
                $media->file_size = $file['size'];
                // Get other data from POST fields
                $media->caption = isset($_POST['caption']) ? filter_var($_POST['caption'], FILTER_SANITIZE_STRING) : null;
                $media->is_primary = isset($_POST['is_primary']) ? filter_var($_POST['is_primary'], FILTER_VALIDATE_BOOLEAN) : false;
                $media->sort_order = isset($_POST['sort_order']) ? (int)$_POST['sort_order'] : 0;

            } else {
                throw new InvalidArgumentException('Unsupported Content-Type. Use application/json or multipart/form-data.');
            }

            // 3. Create Media Record in DB (handles single primary logic)
            if ($media->create()) {
                // Fetch the created record to return complete data
                $newMedia = Media::findById($this->db, $media->id);
                if ($newMedia) {
                    ResponseHandler::json(
                        ['message' => 'Media created successfully', 'data' => $newMedia->toArray()],
                        201 // Created
                    );
                } else {
                     ResponseHandler::error('Media created, but failed to retrieve details.', 500);
                }
            }
             // create() throws exception on failure

        } catch (InvalidArgumentException $e) {
            ResponseHandler::error('Bad Request: ' . $e->getMessage(), 400);
        } catch (Exception $e) {
            // Log detailed error
            error_log("MediaController Error (store for Property ID: $propertyId): " . $e->getMessage());
            // Potentially clean up uploaded file if DB insert failed after move
            if (isset($targetPath) && file_exists($targetPath) && $media->media_source_type === 'local') {
                 unlink($targetPath); // Attempt cleanup
            }
            ResponseHandler::error('Internal Server Error: Could not process media. ' /*. $e->getMessage()*/, 500); // Don't expose too much detail
        }
    }

    /**
    * GET /properties/{propertyId}/media
    * Retrieves all media items for a specific property.
    */
    public function index(int $propertyId): void {
        // 1. Verify Property Exists (optional but good practice)
        try {
            if (!Property::findById($this->db, $propertyId)) {
                ResponseHandler::error('Property Not Found', 404);
            }
        } catch (Exception $e) {
             ResponseHandler::error('Error verifying property: ' . $e->getMessage(), 500);
        }

        // 2. Fetch Media Items
        try {
             $mediaItems = Media::findByPropertyId($this->db, $propertyId);
             $mediaData = array_map(fn(Media $item) => $item->toArray(), $mediaItems);
             ResponseHandler::json(['data' => $mediaData]);

        } catch (Exception $e) {
             error_log("MediaController Error (index for Property ID: $propertyId): " . $e->getMessage());
             ResponseHandler::error('Could not retrieve media items.', 500);
        }
    }


    // Helper for upload error messages
    private function uploadErrorMessage(int $errorCode): string {
        switch ($errorCode) {
            case UPLOAD_ERR_INI_SIZE:
                return "File exceeds upload_max_filesize directive in php.ini.";
            case UPLOAD_ERR_FORM_SIZE:
                return "File exceeds MAX_FILE_SIZE directive specified in the HTML form.";
            case UPLOAD_ERR_PARTIAL:
                return "File was only partially uploaded.";
            case UPLOAD_ERR_NO_FILE:
                return "No file was uploaded.";
            case UPLOAD_ERR_NO_TMP_DIR:
                return "Missing a temporary folder.";
            case UPLOAD_ERR_CANT_WRITE:
                return "Failed to write file to disk.";
            case UPLOAD_ERR_EXTENSION:
                return "A PHP extension stopped the file upload.";
            default:
                return "Unknown upload error.";
        }
    }

    // --- Future methods ---
    // public function destroy(int $propertyId, int $mediaId) { /* ... */ }
    // public function update(int $propertyId, int $mediaId, array $data) { /* ... */ } // e.g., update caption, is_primary, sort_order
}
?>