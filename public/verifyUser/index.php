<?php
header("Content-type: text/plain; charset=UTF-8"); // set header content-type to text for easy readability when using fetch (AJAX)

include "../dbConn.php";
include "../utils.php";

$conn = dbConn(); // connect to db

function verifyUser($conn) : string
{

    $verifyCode = mysqli_real_escape_string($conn, $_POST["verifyCode"]);
    $userEmail = $_SESSION["userEmail"];

    $sql = "SELECT userCode FROM MoneyTabs.users WHERE email='$userEmail' or username='$userEmail'";

    if ($row = $conn->query($sql)->fetch_array())
    {
        // grab userCode from db
        if ($verifyCode == $row["userCode"])
        {
            //if they match
            $updateSql = "UPDATE MoneyTabs.users SET verified=1 WHERE email='$userEmail' or username='$userEmail'";
            if ($conn->query($updateSql) === TRUE)
            {
                //user now verified
                return "ok";
            }
            else
            {
                //something went wrong in the query
                return "Something went wrong please try again.";
            }
        }
        else
        {
            //if they don't match
            return "wrong code";
        }
    }
    else
    {
        //something went wrong in the query
        return "Verification code does not exist or something went wrong.";
    }
}

function resendVerifyCode($conn) : string
{
    $userCode = generateUserCode(); // generates new user code and stores in a variable
    $userEmail = $_SESSION["userEmail"];

    $sql = "UPDATE MoneyTabs.users SET userCode='$userCode' WHERE email='$userEmail' OR username='$userEmail'";

    if ($conn->query($sql) === TRUE)
    {
        //userCode is updated send out new email
        $subject = "Verify Email";
        $message = "<!DOCTYPE html>
                <html lang='en'>
                <head>
                    <meta charset='UTF-8'>
                    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                    <title>Verify Email</title>
                </head>
                <body style='font-size: 16px'>
                    <h2>Verify Email</h2>
                    <br>
                    <p>Type the code into the box</p>
                    <br>
                    <p>Verification code: <strong>$userCode</strong></p>
                    <br>
                    <br>
                    <p style='color: grey; font-size: 12px;'>Please do not reply to this email. This is a no-reply email. Thank you</p>
                </body>
                </html>";
        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8\r\n";
        $headers .= "From: Money Tabs - Verify Email <no-reply-verify@moneytabs.tk>";
//    mail($email, $subject, $message, $headers);
        return "ok";
    }
    else
    {
        //something went wrong in the query
        return "Something went wrong please try again later";
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST")
{
    echo verifyUser($conn);
}
elseif ($_SERVER["REQUEST_METHOD"] == "GET")
{
    echo resendVerifyCode($conn);
}
else
{
    echo "Something went wrong please try again later";
}
