<?php
session_start();

/**
 * generateUserCode function
 * Generates a userCode for use use
 * @return string
 */
function generateUserCode(): string
{
    $characters = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    $randString = "";
    for ($i = 0; $i < rand(10, 20); $i++)
    {
        $randString .= $characters[rand(0, strlen($characters))];
    }
    return $randString;
}
