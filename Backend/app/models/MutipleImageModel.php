<?php

class MutipleImageModel{
    private $model;
    private $tableName = "images";

    public function __construct($database){
        $this->model = $database;
    }


    //  Get All image 
    public function getAllimageModel(){
        try {
            $query = "SELECT * FROM " . $this->tableName;
            $stmt = $this->model->prepare($query);
            return $stmt->excute();
        } catch (PDOException $e) {
            die('Database Error : ' . $e->getMessage());
        }

        return $sql;
    }
}
