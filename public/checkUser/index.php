<?php
header("Content-type: text/plain; charset=UTF-8"); // set header content-type to text for easy readability when using fetch (AJAX)
include "../dbConn.php";

$conn = dbConn(); // connect to db

$username = mysqli_escape_string($conn, $_POST["username"]); // grab username escape string for security reasons

$sql = "SELECT firstName FROM users WHERE username=$username"; // sql query to run

if ($conn->query($sql)->num_rows > 0)
{
    echo "Username already exists"; // username does exist
}
else
{
    echo "ok"; // if username doesn't exist
}
