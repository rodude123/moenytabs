<?php
header("Content-type: text/plain; charset=UTF-8"); // set header content-type to text for easy readability when using fetch (AJAX)
include "../dbConn.php";

$conn = dbConn(); // connect to db

$userEmail = mysqli_escape_string($conn, $_POST["userEmail"]); //grab email and escape string for security reasons
$type = $_POST["type"];

/**
 * checkUserEmail function
 * Checks to see if username or email exists and then returns appropriate message or boolean
 * @param string $userEmail username or email to check
 * @param mysqli $conn mysql connection
 * @param string $type email or username or both for use with returning
 * @return bool|string return appropriate message or boolean
 */
function checkUserEmail(string $userEmail, mysqli $conn, string $type): string|bool
{
    $sql = "SELECT firstName FROM MoneyTabs.users WHERE email='$userEmail' OR username='$userEmail'"; // sql query to run

    if ($conn->query($sql)->num_rows > 0)
    {
        if ($type == "email")
        {
            return "Email already exists"; // if email does exist
        }
        elseif ($type == "username")
        {
            return "Username already exists"; // if username does exist
        }
        elseif ($type == "both")
        {
            return True; // for use when checking both at the same time and no output is necessary
        }
        else
        {
            return "Something went wrong please try again later";
        }
    }
    else
    {
        return "ok"; // if email or username doesn't exist
    }
}

echo checkUserEmail($userEmail, $conn, $type);
