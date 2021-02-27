<?php
header("Content-type: text/plain; charset=UTF-8");
include "../dbConn.php";

$conn = dbConn();

$email = mysqli_escape_string($conn, $_POST["email"]);

$sql = "SELECT firstName FROM users WHERE email=$email";

if ($conn->query($sql)->num_rows > 0)
{
    echo "Email already exists";
}
else
{
    echo "ok";
}
