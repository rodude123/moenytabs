<?php
header("Content-type: text/plain; charset=UTF-8");
include "../dbConn.php";

$email = $_POST["email"];

$sql = "SELECT firstName FROM users WHERE email=$email";

$conn = dbConn();

if ($conn->query($sql)->num_rows > 0)
{
    echo "Email already exists";
}
else
{
    echo "ok";
}
