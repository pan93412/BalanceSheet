<?php
class db extends mysqli {
  function checkPass($result) {
    if ($result === false) {
      die('Failed. :(');
    }
  }

  function insert($name, $desc, $type, $amount, $date) {
    if ($type === "") $type = "其他";
    $this->checkPass($this->query(
      $this->real_escape_string(
        "INSERT INTO journal (`name`, `desc`, `type`, amount, `date`) VALUES ('{$name}', '{$desc}', '{$type}', {$amount}, '{$date}')"
      )
    ));

    echo "OK"; // 告訴 JS 已經完成
  }

  function modify($id, $name, $desc, $type, $amount, $date) {
    function modifyTool($fieldName, $fieldVal, $that, $id) {
      if ($fieldVal !== "") $that->checkPass($that->query(
        $that->real_escape_string(
          "UPDATE journal SET `{$fieldName}`='{$fieldVal}' WHERE `id`={$id}"
        )
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
    $this->checkPass($this->query($this->real_escape_string("DELETE FROM journal WHERE `id`={$id}")));

    echo "OK"; // 告訴 JS 已經完成
  }

  function getData() {
    $queryResult = $this->query($this->real_escape_string("SELECT * FROM journal"));
    $result = $queryResult->fetch_all(MYSQLI_ASSOC);
    return json_encode($result, JSON_NUMERIC_CHECK | JSON_PRETTY_PRINT);
  }
}

class loginDB extends mysqli {
  function getUsers() {
    $queryResult = $this->query($this->real_escape_string("SELECT * FROM login"));
    return $queryResult->fetch_all(MYSQLI_ASSOC);
  }
}
?>
