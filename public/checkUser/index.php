<?php
header("Content-type: text/plain; charset=UTF-8");
include "../dbConn.php";

$username = $_POST["username"];

$sql = "SELECT firstName FROM users WHERE username=$username";

$conn = dbConn();

if ($conn->query($sql)->num_rows > 0)
{
    echo "Username already exists";
}
else
{
    echo "ok";
}
