<?php
header("Content-type: text/plain; charset=UTF-8"); // set header content-type to text for easy readability when using fetch (AJAX)
session_start();

if (isset($_SESSION["userEmail"]))
{
    //user has signed in/signed up before
    echo "ok";
}
else
{
    //user has not signed in/signed up before
    echo "not ok";
}
