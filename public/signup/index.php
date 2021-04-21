<?php
//////////////////////////
///       Signup       ///
//////////////////////////
header("Content-type: text/plain; charset=UTF-8"); // set header content-type to text for easy readability when using fetch (AJAX)

include "../dbConn.php";
include "../utils.php";

$conn = dbConn(); // connect to db

// grab form elements that have been posted and escapes for security reasons.
$firstName = mysqli_real_escape_string($conn, $_POST["firstName"]);
$lastName = mysqli_real_escape_string($conn, $_POST["lastName"]);
$username = mysqli_real_escape_string($conn, $_POST["username"]);
$email = mysqli_real_escape_string($conn, $_POST["email"]);
$password = password_hash(mysqli_real_escape_string($conn, $_POST["password"]), PASSWORD_DEFAULT); // password_hashes the password for security reasons

$userCode = generateUserCode(); // generates user code and stores in a variable
$verified = 0;

$query = $conn->prepare("INSERT INTO MoneyTabs.users (firstName, lastName, username, email, password, verified, userCode) VALUES(?, ?, ?, ?, ?, ?, ?)");
$query->bind_param("sssssis", $firstName, $lastName, $username, $email, $password, $verified, $userCode);

if ($query->execute())
{
    $_SESSION["userEmail"] = $username;
    $_SESSION["verified"] = 0;

    //send email to user
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
    echo "Couldn't signup, please try again later.";
}
