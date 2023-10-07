<?php
require 'db_connection.php';
$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->email) &&
    isset($data->password) &&
    !empty(trim($data->email)) &&
    !empty(trim($data->password))
) {
    $email = mysqli_real_escape_string($db_conn, trim($data->email));
    $password = mysqli_real_escape_string($db_conn, trim($data->password));

    // You should use prepared statements to prevent SQL injection.
    $sql = "SELECT * FROM user WHERE email = '$email' AND password = '$password'";
    $result = $db_conn->query($sql);

    if (!$result) {
        // Handle the query error, e.g., log the error or return an error response.
        echo json_encode(["status" => false, "message" => "Database query error"]);
    } else {
        $json_array["userdata"] = [];

        while ($row = mysqli_fetch_assoc($result)) {
            $viewjson["user_id"] = $row['user_id'];
            $viewjson["name"] = $row['name'];
            $viewjson["email"] = $row['email'];
        }

        echo json_encode(["status" => true, "user" => $viewjson]);
    }
} else {
    echo json_encode(["status" => false, "message" => "Invalid input data"]);
}
