<?php
//authentification
// pfp,username,headline,description,categs,rating
// pfp,username, categs, images
// categs how do


use Firebase\JWT\JWT;

require_once("connexion.php");
require_once("vendor/autoload.php");

header('Content-type:application/json');

$jwt_token = $_SERVER['HTTP_AUTHORIZATION'];


?>