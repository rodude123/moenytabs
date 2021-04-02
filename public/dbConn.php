<?php

/**
 * Connect to mysql db
 * @return mysqli
 */

function dbConn(): mysqli
{
    $server = "localhost";
    $username = "root";
    $password = "Bangalore123";
    $dbName = "MoneyTabs";
    $conn = new mysqli($server, $username, $password, $dbName);

    if ($conn->connect_error)
    {
        die("Connection failed " . $conn->connect_error);
    }
    return $conn;
}

