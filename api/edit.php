<?php
include('./options.php');
include('./db.php');

$db = new db($mysql_host, $mysql_username, $mysql_password, $mysql_dbname);
if ($_POST['_METHOD'] === "POST") {
  $db->insert($_POST['name'], $_POST['desc'], $_POST['type'], $_POST['amount'], $_POST['date']);
}

if ($_POST['_METHOD'] === "PUT") {
  $db->modify($_POST['id'], $_POST['name'], $_POST['desc'], $_POST['type'], $_POST['amount'], $_POST['date']);
}

if ($_POST['_METHOD'] === "DELETE") {
  $db->delete($_POST['toDel']);
}
?>