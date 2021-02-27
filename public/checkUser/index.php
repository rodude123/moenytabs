<?php
header("Content-type: text/plain; charset=UTF-8");
include "../dbConn.php";

$conn = dbConn();

$username = mysqli_escape_string($conn, $_POST["username"]);

$sql = "SELECT firstName FROM users WHERE username=$username";

if ($conn->query($sql)->num_rows > 0)
{
    echo "Username already exists";
}
else
{
    echo "ok";
}
