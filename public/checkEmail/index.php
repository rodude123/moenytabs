<?php
header("Content-type: text/plain; charset=UTF-8"); //set header content-type to text for easy readability when using fetch (AJAX)
include "../dbConn.php";

$conn = dbConn(); //connect to db

$email = mysqli_escape_string($conn, $_POST["email"]); //grab email and escape string for security reasons

$sql = "SELECT firstName FROM users WHERE email=$email"; // sql query to run

if ($conn->query($sql)->num_rows > 0)
{
    echo "Email already exists"; // if email does exist
}
else
{
    echo "ok"; // if email doesn't exist
}
