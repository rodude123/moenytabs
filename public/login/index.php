<?php
header("Content-type: text/text; charset=UTF-8"); // set header content-type to text for easy readability when using fetch (AJAX)
include "../dbConn.php";

$conn = dbConn(); // connect to db

// grab form elements that have been posted and escapes for security reasons.
$userEmail = mysqli_escape_string($conn, $_POST["userEmail"]);
$password = mysqli_escape_string($conn, $_POST["password"]);

$sql = "SELECT password, verified FROM MoneyTabs.users WHERE email='$userEmail' OR username='$userEmail'";

if ($row = $conn->query($sql)->fetch_array())
{
    if (password_verify($password, $row["password"]))
    {
        if ($row["verified"] == 1)
        {
            echo "ok"; // if both email/username and password are correct login yay and nothing went wrong in the process
        }
        else
        {
            echo "not verified";
        }
    }
    else
    {
        echo "Username/Email and Passwords don't match. Did you mean to signup?"; // Only password is wrong
    }
}
else
{
    echo "Something went wrong please try again.";
}


