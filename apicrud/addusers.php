<?php 
require 'db_connection.php';


$data = json_decode(file_get_contents("php://input"));

if(isset($data->fullname)
	&& isset($data->email) 
	&& isset($data->password) 
	&& !empty(trim($data->fullname))
	&& !empty(trim($data->email))
	&& !empty(trim($data->password))
	){
		
	$fullname = mysqli_real_escape_string($db_conn, trim($data->fullname));
	$email = mysqli_real_escape_string($db_conn, trim($data->email));
	$password = mysqli_real_escape_string($db_conn, trim($data->password));

	$add = mysqli_query($db_conn,"insert into user (name,email,password) values('$fullname','$email','$password')");
	if($add){
		$id = $db_conn->insert_id;
		echo json_encode(["status"=>true,"insertid"=>$id]);
		return;
    }else{
        echo json_encode(["status"=>false,"msg"=>"Server Problem. Please Try Again"]);
		return;
    } 

} else{
    echo json_encode(["status"=>false,"msg"=>"Please fill all the required fields!"]);
	return;
}