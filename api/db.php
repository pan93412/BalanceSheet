<?php
class db extends mysqli {
  function checkPass($result) {
    if ($result === false) {
      die('Failed. :(');
    }
  }

  function escape($string) {
    return $this->real_escape_string(htmlspecialchars($string, ENT_NOQUOTES));
  }

  function insert($raw_name, $raw_desc, $raw_type, $raw_amount, $raw_date) {
    if ($raw_type === "") $raw_type = "其他";
    
    $name = $this->escape($raw_name);
    $desc = $this->escape($raw_desc);
    $type = $this->escape($raw_type);
    $amount = $this->escape($raw_amount);
    $date = $this->escape($raw_date);

    $this->checkPass(
      $this->query(
        "INSERT INTO journal (`name`, `desc`, `type`, amount, `date`) VALUES ('{$name}', '{$desc}', '{$type}', {$amount}, '{$date}')"
      )
    );

    echo "OK"; // 告訴 JS 已經完成
  }

  function modify($id, $name, $desc, $type, $amount, $date) {
    function modifyTool($fieldName, $fieldRawVal, $that, $id) {
      if (!is_numeric($id)) die("id 必須為數字。");
      $fieldVal = $that->escape($fieldRawVal);
      if ($fieldVal !== "") $that->checkPass($that->query(
          "UPDATE journal SET `{$fieldName}`='{$fieldVal}' WHERE `id`={$id}"
      ));
    }
    
    modifyTool('name', $name, $this, $id);
    modifyTool('desc', $desc, $this, $id);
    modifyTool('type', $type, $this, $id);
    modifyTool('amount', $amount, $this, $id);
    modifyTool('date', $date, $this, $id);

    echo "OK"; // 告訴 JS 已經完成
  }
  
  function delete($id) {
    if (!is_numeric($id)) die("id 必須為數字。");
    $this->checkPass($this->query("DELETE FROM journal WHERE `id`={$id}"));

    echo "OK"; // 告訴 JS 已經完成
  }

  function getData() {
    $queryResult = $this->query("SELECT * FROM journal");
    $result = $queryResult->fetch_all(MYSQLI_ASSOC);
    return json_encode($result, JSON_NUMERIC_CHECK | JSON_PRETTY_PRINT);
  }
}

class loginDB extends mysqli {
  function getUsers() {
    $queryResult = $this->query("SELECT * FROM login");
    return $queryResult->fetch_all(MYSQLI_ASSOC);
  }
}
?>
