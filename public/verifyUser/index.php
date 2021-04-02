<?php
header("Content-type: text/plain; charset=UTF-8"); // set header content-type to text for easy readability when using fetch (AJAX)
session_start();

include "../dbConn.php";

$conn = dbConn(); // connect to db

$verifyCode = mysqli_escape_string($conn, $_POST["verifyCode"]);
$userEmail = $_SESSION["userEmail"];

$sql = "SELECT userCode FROM MoneyTabs.users WHERE email='$userEmail' or username='$userEmail'";

if ($row = $conn->query($sql)->fetch_array())
{
    if ($verifyCode == $row["userCode"])
    {
        $updateSql = "UPDATE MoneyTabs.users SET verified=1 WHERE email='$userEmail'";
        if ($conn->query($updateSql) === TRUE)
        {
            echo "ok";
        }
        else
        {
            echo "Something went wrong please try again.";
        }
    }
    else
    {
        echo "wrong code";
    }
}
else
{
    echo "Verification code does not exist or something went wrong.";
}
