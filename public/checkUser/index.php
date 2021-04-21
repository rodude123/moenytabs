<?php
//////////////////////////
///      checkUser     ///
//////////////////////////
header("Content-type: text/plain; charset=UTF-8"); // set header content-type to text for easy readability when using fetch (AJAX)
include "../dbConn.php";

$conn = dbConn(); // connect to db

/**
 * checkUserEmail function
 * Checks to see if username or email exists and then returns appropriate message or boolean
 * @param mysqli $conn mysql connection
 * @return bool|string return appropriate message or boolean
 */
function checkUserEmail(mysqli $conn): string|bool
{

    $userEmail = mysqli_real_escape_string($conn, $_POST["userEmail"]); //grab email and escape string for security reasons
    $type = $_POST["type"];
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


/**
 * checkUser function
 * Checks to see if the user has logged in and not trying to go to a locked page i.e one that requires them to login.
 * @return string
 */
function checkUser() : string
{

    if (isset($_SESSION["userEmail"]))
    {
        //user has signed in/signed up before
        if ($_SESSION["verified"] == 1)
        {
            return "ok";
        }
        else
        {
            return "not verified";
        }
    }
    else
    {
        //user has not signed in/signed up before
        return "not ok";
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST")
{
    echo checkUserEmail($conn);
}
else
{
    echo checkUser();
}



