<?php
  include('./options.php');
  include('./db.php');

  $db = new db($mysql_host, $mysql_username, $mysql_password, $mysql_dbname);
  $data = $db->getData();

  echo $data;

  $db->close();
?>