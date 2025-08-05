<?php
class Certification {
    private $conn;
    private $table_name = "certifications";

    public $id;
    public $category_id;
    public $title;
    public $description;
    public $detailed_description;
    public $price;
    public $duration_hours;
    public $difficulty_level;
    public $language;
    public $certificate_type;
    public $image_url;
    public $syllabus_url;
    public $prerequisites;
    public $learning_objectives;
    public $is_active;
    public $featured;
    public $created_at;
    public $updated_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Read all certifications
    function read() {
        $query = "SELECT 
                    c.id, c.category_id, c.title, c.description, c.price,
                    c.duration_hours, c.difficulty_level, c.language,
                    c.certificate_type, c.is_active, c.featured,
                    c.created_at, c.updated_at,
                    cat.name as category_name
                  FROM " . $this->table_name . " c
                  LEFT JOIN certification_categories cat ON c.category_id = cat.id
                  ORDER BY c.created_at DESC";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    // Read single certification
    function readOne() {
        $query = "SELECT 
                    c.id, c.category_id, c.title, c.description, 
                    c.detailed_description, c.price, c.duration_hours,
                    c.difficulty_level, c.language, c.certificate_type,
                    c.image_url, c.syllabus_url, c.prerequisites,
                    c.learning_objectives, c.is_active, c.featured,
                    c.created_at, c.updated_at,
                    cat.name as category_name
                  FROM " . $this->table_name . " c
                  LEFT JOIN certification_categories cat ON c.category_id = cat.id
                  WHERE c.id = ? 
                  LIMIT 0,1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if($row) {
            $this->category_id = $row['category_id'];
            $this->title = $row['title'];
            $this->description = $row['description'];
            $this->detailed_description = $row['detailed_description'];
            $this->price = $row['price'];
            $this->duration_hours = $row['duration_hours'];
            $this->difficulty_level = $row['difficulty_level'];
            $this->language = $row['language'];
            $this->certificate_type = $row['certificate_type'];
            $this->image_url = $row['image_url'];
            $this->syllabus_url = $row['syllabus_url'];
            $this->prerequisites = $row['prerequisites'];
            $this->learning_objectives = $row['learning_objectives'];
            $this->is_active = $row['is_active'];
            $this->featured = $row['featured'];
            $this->created_at = $row['created_at'];
            $this->updated_at = $row['updated_at'];
            return true;
        }

        return false;
    }

    // Create certification
    function create() {
        $query = "INSERT INTO " . $this->table_name . "
                  SET category_id=:category_id, title=:title, 
                      description=:description, detailed_description=:detailed_description,
                      price=:price, duration_hours=:duration_hours,
                      difficulty_level=:difficulty_level, language=:language,
                      certificate_type=:certificate_type, image_url=:image_url,
                      syllabus_url=:syllabus_url, prerequisites=:prerequisites,
                      learning_objectives=:learning_objectives, featured=:featured";

        $stmt = $this->conn->prepare($query);

        // Sanitize
        $this->title = htmlspecialchars(strip_tags($this->title));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->detailed_description = htmlspecialchars(strip_tags($this->detailed_description));
        $this->difficulty_level = htmlspecialchars(strip_tags($this->difficulty_level));
        $this->language = htmlspecialchars(strip_tags($this->language));
        $this->certificate_type = htmlspecialchars(strip_tags($this->certificate_type));
        $this->image_url = htmlspecialchars(strip_tags($this->image_url));
        $this->syllabus_url = htmlspecialchars(strip_tags($this->syllabus_url));
        $this->prerequisites = htmlspecialchars(strip_tags($this->prerequisites));
        $this->learning_objectives = htmlspecialchars(strip_tags($this->learning_objectives));

        // Bind values
        $stmt->bindParam(":category_id", $this->category_id);
        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":detailed_description", $this->detailed_description);
        $stmt->bindParam(":price", $this->price);
        $stmt->bindParam(":duration_hours", $this->duration_hours);
        $stmt->bindParam(":difficulty_level", $this->difficulty_level);
        $stmt->bindParam(":language", $this->language);
        $stmt->bindParam(":certificate_type", $this->certificate_type);
        $stmt->bindParam(":image_url", $this->image_url);
        $stmt->bindParam(":syllabus_url", $this->syllabus_url);
        $stmt->bindParam(":prerequisites", $this->prerequisites);
        $stmt->bindParam(":learning_objectives", $this->learning_objectives);
        $stmt->bindParam(":featured", $this->featured);

        if($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Update certification
    function update() {
        $query = "UPDATE " . $this->table_name . "
                  SET category_id = :category_id,
                      title = :title,
                      description = :description,
                      detailed_description = :detailed_description,
                      price = :price,
                      duration_hours = :duration_hours,
                      difficulty_level = :difficulty_level,
                      language = :language,
                      certificate_type = :certificate_type,
                      image_url = :image_url,
                      syllabus_url = :syllabus_url,
                      prerequisites = :prerequisites,
                      learning_objectives = :learning_objectives,
                      featured = :featured,
                      is_active = :is_active
                  WHERE id = :id";

        $stmt = $this->conn->prepare($query);

        // Sanitize
        $this->title = htmlspecialchars(strip_tags($this->title));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->detailed_description = htmlspecialchars(strip_tags($this->detailed_description));
        $this->difficulty_level = htmlspecialchars(strip_tags($this->difficulty_level));
        $this->language = htmlspecialchars(strip_tags($this->language));
        $this->certificate_type = htmlspecialchars(strip_tags($this->certificate_type));
        $this->image_url = htmlspecialchars(strip_tags($this->image_url));
        $this->syllabus_url = htmlspecialchars(strip_tags($this->syllabus_url));
        $this->prerequisites = htmlspecialchars(strip_tags($this->prerequisites));
        $this->learning_objectives = htmlspecialchars(strip_tags($this->learning_objectives));
        $this->id = htmlspecialchars(strip_tags($this->id));

        // Bind values
        $stmt->bindParam(':category_id', $this->category_id);
        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':description', $this->description);
        $stmt->bindParam(':detailed_description', $this->detailed_description);
        $stmt->bindParam(':price', $this->price);
        $stmt->bindParam(':duration_hours', $this->duration_hours);
        $stmt->bindParam(':difficulty_level', $this->difficulty_level);
        $stmt->bindParam(':language', $this->language);
        $stmt->bindParam(':certificate_type', $this->certificate_type);
        $stmt->bindParam(':image_url', $this->image_url);
        $stmt->bindParam(':syllabus_url', $this->syllabus_url);
        $stmt->bindParam(':prerequisites', $this->prerequisites);
        $stmt->bindParam(':learning_objectives', $this->learning_objectives);
        $stmt->bindParam(':featured', $this->featured);
        $stmt->bindParam(':is_active', $this->is_active);
        $stmt->bindParam(':id', $this->id);

        if($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Delete certification (soft delete)
    function delete() {
        $query = "UPDATE " . $this->table_name . " SET is_active = 0 WHERE id = ?";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);

        if($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Search certifications
    function search($keywords) {
        $query = "SELECT 
                    c.id, c.category_id, c.title, c.description, c.price,
                    c.duration_hours, c.difficulty_level, c.language,
                    c.certificate_type, c.is_active, c.featured,
                    c.created_at, c.updated_at,
                    cat.name as category_name
                  FROM " . $this->table_name . " c
                  LEFT JOIN certification_categories cat ON c.category_id = cat.id
                  WHERE c.title LIKE ? OR c.description LIKE ?
                  ORDER BY c.created_at DESC";

        $stmt = $this->conn->prepare($query);

        $keywords = htmlspecialchars(strip_tags($keywords));
        $keywords = "%{$keywords}%";

        $stmt->bindParam(1, $keywords);
        $stmt->bindParam(2, $keywords);

        $stmt->execute();

        return $stmt;
    }

    // Count total certifications
    function count() {
        $query = "SELECT COUNT(*) as total_rows FROM " . $this->table_name . " WHERE is_active = 1";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        return $row['total_rows'];
    }
}
?>

