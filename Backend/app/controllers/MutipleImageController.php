<?php
class MutipleImageController {
    private $model;
     
    public function __construct($database) {
        $this->model = new MutipleImageModel($database);
    }

    // Method to get all images
    public function getAllImages() {
        // Call the model's method to get all images
        $query = $this->model->getAllimageModel();
       

        // Fetch and return the data (assuming $result is a PDOStatement or similar)
        return $result->fetchAll();
    }
}