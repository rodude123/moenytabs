<?php
header("Content-type: text/plain; charset=UTF-8"); //set header content-type to text for easy readability when using fetch (AJAX)
include "../dbConn.php";

$conn = dbConn(); // connect to db

$userEmail = mysqli_escape_string($conn, $_POST["userEmail"]); //grab email and escape string for security reasons
$type = $_POST["type"];

$sql = "SELECT firstName FROM users WHERE email=$userEmail OR username=$userEmail"; // sql query to run

if ($conn->query($sql)->num_rows > 0)
{
    if($type == "email")
    {
        echo "Email already exists"; // if email does exist
    }
    elseif ($type == "username")
    {
        echo "Username already exists";
    }
    else
    {
        echo "Something went wrong please try again later";
    }
}
else
{
    echo "ok"; // if email or password doesn't exist
}
