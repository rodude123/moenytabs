<?php
header("Content-type: text/plain; charset=UTF-8"); // set header content-type to text for easy readability when using fetch (AJAX)
session_start();

include "../dbConn.php";

$conn = dbConn(); // connect to db

$userCode = generateUserCode(); // generates new user code and stores in a variable
$userEmail = $_SESSION["userEmail"];

$sql = "UPDATE MoneyTabs.users SET userCode='$userCode' WHERE email='$userEmail'";

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
    echo "ok";
}
else
{
    //something went wrong in the query
    echo "Something went wrong please try again later";
}
