<?php
header("Content-type: text/plain; charset=UTF-8"); // set header content-type to text for easy readability when using fetch (AJAX)
include "../dbConn.php";
include "../utils.php";

$conn = dbConn(); // connect to db

// grab form elements that have been posted and escapes for security reasons.
$firstName = mysqli_escape_string($conn, $_POST["firstName"]);
$lastName = mysqli_escape_string($conn, $_POST["lastName"]);
$username = mysqli_escape_string($conn, $_POST["username"]);
$email = mysqli_escape_string($conn, $_POST["email"]);
$password = password_hash(mysqli_escape_string($conn, $_POST["password"]), PASSWORD_DEFAULT); // password_hashes the password for security reasons

$userCode = generateUserCode(); // generates user code and stores in a variable

$sql = "INSERT INTO MoneyTabs.users (firstName, lastName, username, email, password, verified, userCode) VALUES('$firstName', '$lastName', '$username', '$email', '$password', 0, '$userCode')"; // sql query to run

if ($conn->query($sql) === TRUE)
{
    echo "ok";
}
else
{
    echo "Couldn't signup, please try again later.";
}
