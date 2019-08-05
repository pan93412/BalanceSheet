<?php
include('./options.php');
include('./db.php');

$db = new loginDB($mysql_host, $mysql_username, $mysql_password, $mysql_dbname);

function makePass($rawval) {
  $toReturn = "";
  
  foreach (str_split($rawval) as $token) {
    $toReturn .= $token . 'a';
  }

  foreach (str_split($toReturn) as $token) {
    $toReturn .= $token . 'b';
  }

  return hash('sha256', $toReturn);
} 

function gentoken($user, $pass) {
  return urlencode(base64_encode($user) . '.' . base64_encode(substr($pass, 0, 10)));
}

$users = $db->getUsers(); // 使用者資訊

if (isset($_GET["pass"])) {
  $pass = makePass($_GET["pass"]);
  echo "<meta charset='UTF-8'><table><tr><th>原始密碼</th><th>雜湊後密碼</th></tr><tr><td>{$_GET["pass"]}</td><td>{$pass}</td></tr>";
  return 0;
} else if (isset($_POST["token"])) {
  foreach ($users as $user) {
    $token = gentoken($user["user"], $user["pass"]);
    if ($token === $_POST["token"]) {
      echo "PASS";
      return 0;
    }
  }
  return 1;
} else if (isset($_POST["user"]) && isset($_POST["pwd"])) {
  $pwd = makePass($_POST["pwd"]);
  foreach ($users as $user) {
    if ($_POST["user"] === $user["user"] && $pwd === $user["pass"]) {
      $token = gentoken($user["user"], $user["pass"]);
      setcookie('user', $user["user"], time()+60*60, '/'); // 預設 cookie 有效一個小時
      setcookie('token', $token, time()+60*60, '/');
      echo "登入完成：稍候回到上一頁，請重新整理頁面。";
      echo "<script>setTimeout(() => {history.back()}, 1000)</script>";
      return 0;
    } else {
      echo "您帳號或密碼輸入錯誤！將會在三秒後回到上個畫面。";
      echo "<script>setTimeout(() => {history.back()}, 3000)</script>";
      return 1;
    }
  }
} else {
  echo "<b>請使用登入頁面進入此處！！</b>存取被拒。";
  return 0;
}
?>