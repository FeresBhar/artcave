<?php

$servername = "localhost"; 
$username = "root";
$password = ""; 
$base = "project"; 

try{
$connexion = new PDO("mysql:host=$servername;dbname=$base",$username,$password);
}
catch(Exception $e)
{ echo $e->getMessage();}
?>