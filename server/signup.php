<?php
session_start();
include_once "config.php";
$fnmae = mysqli_real_escape_string($conn, $_POST['fname']);
$lnmae = mysqli_real_escape_string($conn, $_POST['lname']);
$email = mysqli_real_escape_string($conn, $_POST['email']);
$password = mysqli_real_escape_string($conn, $_POST['password']);

if (!empty($fnmae) && !empty($lnmae) && !empty($email) && !empty($password)) {
    //echo $fnmae . " " . $lnmae . " " . $email . " " . $password;
    //let's check if user email is valid or not
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        //let's check if user email is already exist or not in database
        $sql = mysqli_query($conn, "SELECT email FROM users WHERE email= '{$email}'");
        if (mysqli_num_rows($sql) > 0) {
            echo "Email already exist";
        } else {
            //let's check user uploaded file or not
            if (isset($_FILES['image'])) { //if file is upload
                // echo "File is uploaded";
                $img_name = $_FILES['image']['name']; // gettin user uploaded file name
                // $img_type = $_FILES['image']['type']; // gettin user uploaded file type
                $tmp_name = $_FILES['image']['tmp_name']; // this temporary name is used to store file in server

                // let's explode image and get the last extension like jpg, png
                $img_explode = explode('.', $img_name);
                $img_ext = end($img_explode); // this will get the last extension of image
                $extensions = ['jpg', 'jpeg', 'png']; // this is array of allowed extensions
                if (in_array($img_ext, $extensions) == true) { //if user uploade img ext is matched with any array ext
                    $time = time(); // this will get current time... 
                    // we need this time because when you uploading user img to in our folder we rename user file with current time so all the img file will have a unique name
                    //let's move user uploaded img to our particular folder         

                    $new_img_name = $time . $img_name;   // this will create new img name with current time
                    // this will move user uploaded img to our folder) 
                    if (move_uploaded_file($tmp_name, "images/" . $new_img_name)) {
                        $status = "Active now"; //once user signed up then status will be active now
                        $random_id = rand(time(), 1000000); // this will create random id for user

                        //let's insert all  user data inside table
                        $sql2 = mysqli_query($conn, "INSERT INTO users (unique_id, fname, 	lname, email, password, img, 	status)
                                             VALUES ('{$random_id}', '{$fnmae}', '{$lnmae}', '{$email}', '{$password}', '{$new_img_name}', '{$status}')");

                        if ($sql2) {
                            // echo "User registered successfully";
                            $sql3 = mysqli_query($conn, "SELECT * FROM users WHERE email = '{$email}'");
                            if(mysqli_num_rows($sql3) > 0){
                                $row = mysqli_fetch_assoc($sql3);
                                $_SESSION['unique_id'] = $row['unique_id']; // create session for user unique id
                                echo "success";
                            }
                        } else {
                            echo "Something went wrong";
                        }
                    }
                } else {
                    echo "Please select an Image file - jpg, jpeg, png";
                }
            } else {
                echo "File is not uploaded";
            }
        }
    } else {
        echo "$email - is not a valid email address";
    }
} else {
    echo "All fields are required";
}
