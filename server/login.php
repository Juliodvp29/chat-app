<?php 
session_start();
include_once "config.php";
$email = mysqli_real_escape_string($conn, $_POST['email']);
$password = mysqli_real_escape_string($conn, $_POST['password']);
// echo "hello from login";

if(!empty($email) && !empty($password)){            
    //check if data exist or not in database
    $sql = mysqli_query($conn, "SELECT * FROM users WHERE email = '{$email}' AND password = '{$password}'");
    if(mysqli_num_rows($sql) > 0){
        $row = mysqli_fetch_assoc($sql);
        $_SESSION['unique_id'] = $row['unique_id'];
        echo "success";
    }else{
        echo "Email or password is incorrect";
    }
}else{
    echo "All fields are filled";
}
?>