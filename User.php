<?php
class User {
    private $conn;
    private $table_name = "users";

    public $id;
    public $email;
    public $password_hash;
    public $first_name;
    public $last_name;
    public $phone;
    public $date_of_birth;
    public $country;
    public $city;
    public $address;
    public $role;
    public $email_verified;
    public $is_active;
    public $created_at;
    public $updated_at;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Read all users
    function read() {
        $query = "SELECT 
                    id, email, first_name, last_name, phone, 
                    country, city, role, email_verified, is_active, 
                    created_at, updated_at
                  FROM " . $this->table_name . " 
                  ORDER BY created_at DESC";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    // Read single user
    function readOne() {
        $query = "SELECT 
                    id, email, first_name, last_name, phone, 
                    date_of_birth, country, city, address, role, 
                    email_verified, is_active, created_at, updated_at
                  FROM " . $this->table_name . " 
                  WHERE id = ? 
                  LIMIT 0,1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if($row) {
            $this->email = $row['email'];
            $this->first_name = $row['first_name'];
            $this->last_name = $row['last_name'];
            $this->phone = $row['phone'];
            $this->date_of_birth = $row['date_of_birth'];
            $this->country = $row['country'];
            $this->city = $row['city'];
            $this->address = $row['address'];
            $this->role = $row['role'];
            $this->email_verified = $row['email_verified'];
            $this->is_active = $row['is_active'];
            $this->created_at = $row['created_at'];
            $this->updated_at = $row['updated_at'];
            return true;
        }

        return false;
    }

    // Create user
    function create() {
        $query = "INSERT INTO " . $this->table_name . "
                  SET email=:email, password_hash=:password_hash, 
                      first_name=:first_name, last_name=:last_name,
                      phone=:phone, date_of_birth=:date_of_birth,
                      country=:country, city=:city, address=:address,
                      role=:role";

        $stmt = $this->conn->prepare($query);

        // Sanitize
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->password_hash = htmlspecialchars(strip_tags($this->password_hash));
        $this->first_name = htmlspecialchars(strip_tags($this->first_name));
        $this->last_name = htmlspecialchars(strip_tags($this->last_name));
        $this->phone = htmlspecialchars(strip_tags($this->phone));
        $this->country = htmlspecialchars(strip_tags($this->country));
        $this->city = htmlspecialchars(strip_tags($this->city));
        $this->address = htmlspecialchars(strip_tags($this->address));
        $this->role = htmlspecialchars(strip_tags($this->role));

        // Bind values
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":password_hash", $this->password_hash);
        $stmt->bindParam(":first_name", $this->first_name);
        $stmt->bindParam(":last_name", $this->last_name);
        $stmt->bindParam(":phone", $this->phone);
        $stmt->bindParam(":date_of_birth", $this->date_of_birth);
        $stmt->bindParam(":country", $this->country);
        $stmt->bindParam(":city", $this->city);
        $stmt->bindParam(":address", $this->address);
        $stmt->bindParam(":role", $this->role);

        if($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Update user
    function update() {
        $query = "UPDATE " . $this->table_name . "
                  SET first_name = :first_name,
                      last_name = :last_name,
                      phone = :phone,
                      date_of_birth = :date_of_birth,
                      country = :country,
                      city = :city,
                      address = :address,
                      role = :role,
                      is_active = :is_active
                  WHERE id = :id";

        $stmt = $this->conn->prepare($query);

        // Sanitize
        $this->first_name = htmlspecialchars(strip_tags($this->first_name));
        $this->last_name = htmlspecialchars(strip_tags($this->last_name));
        $this->phone = htmlspecialchars(strip_tags($this->phone));
        $this->country = htmlspecialchars(strip_tags($this->country));
        $this->city = htmlspecialchars(strip_tags($this->city));
        $this->address = htmlspecialchars(strip_tags($this->address));
        $this->role = htmlspecialchars(strip_tags($this->role));
        $this->id = htmlspecialchars(strip_tags($this->id));

        // Bind values
        $stmt->bindParam(':first_name', $this->first_name);
        $stmt->bindParam(':last_name', $this->last_name);
        $stmt->bindParam(':phone', $this->phone);
        $stmt->bindParam(':date_of_birth', $this->date_of_birth);
        $stmt->bindParam(':country', $this->country);
        $stmt->bindParam(':city', $this->city);
        $stmt->bindParam(':address', $this->address);
        $stmt->bindParam(':role', $this->role);
        $stmt->bindParam(':is_active', $this->is_active);
        $stmt->bindParam(':id', $this->id);

        if($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Delete user (soft delete)
    function delete() {
        $query = "UPDATE " . $this->table_name . " SET is_active = 0 WHERE id = ?";
        
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);

        if($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Search users
    function search($keywords) {
        $query = "SELECT 
                    id, email, first_name, last_name, phone, 
                    country, city, role, email_verified, is_active, 
                    created_at, updated_at
                  FROM " . $this->table_name . " 
                  WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ?
                  ORDER BY created_at DESC";

        $stmt = $this->conn->prepare($query);

        $keywords = htmlspecialchars(strip_tags($keywords));
        $keywords = "%{$keywords}%";

        $stmt->bindParam(1, $keywords);
        $stmt->bindParam(2, $keywords);
        $stmt->bindParam(3, $keywords);

        $stmt->execute();

        return $stmt;
    }

    // Count total users
    function count() {
        $query = "SELECT COUNT(*) as total_rows FROM " . $this->table_name;

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        return $row['total_rows'];
    }
}
?>

