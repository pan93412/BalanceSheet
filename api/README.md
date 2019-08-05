# 「收支表」API 使用說明
歡迎使用收支表的 API :P

## 初始化
1. 將 `initDB.sql` 匯入您的資料庫。

> **注意**：請將 initDB.sql 裡面的 `INSERT INTO `login` VALUES `... 行改成
> 你自己的帳密。 **密碼是經 salt 且 SHA-256 雜湊的。**，可使用
> 此 API 的 `login.php` 來產生，只需加上 query: `login.php?pass=[密碼]`

2. 然後建立 `options.php` 檔案，並放入以下內容：

```php
<?php

/*
 * 設定 API。 
 */

// MySQL 的主機位置
// default: 'localhost'
$mysql_host = '[網域]';

// MySQL 的使用者名稱
// default: ''
$mysql_username = '[使用者名稱]';

// MySQL 的密碼
// default: ''
$mysql_password = "[密碼]";

// MySQL 資料庫名稱
// default: 'journals'
$mysql_dbname = '[資料庫名稱]';

?>
```

3. 確保你的網頁伺服器支援 PHP 及 MySQL，就開始使用吧！

## 對接
進去前端的 `src/moneyAPI.js` 並插入以下字串：

```javascript
/*
  siteAPI: 站台 API
  (然後原本想寫 node 版，但 4…… 懶 qwq)

  如果該 API 並不存放在與此站同連線埠及網域，
  那請確保該 API 所在主機已解決 CORS。

  預設範本是 PHP API 的。請遵循該 API 的
  使用教學設定。
*/

module.exports = {
  getAllData: 'api/get.php', // [GET] 預期回傳所有資料庫內容的 JSON。
  // 只需回傳升序結果，使用時會反轉成降序 [Array]
  addData: 'api/edit.php', // [POST] 將一個項目新增至資料庫 [JSON]
  modifyData: 'api/edit.php', // [PUT] 將資料庫某一項變更為傳入的內容。 [JSON]
  deleteData: 'api/edit.php', // [DELETE] 刪除資料庫某一項。[JSON]
  login: 'api/login.php', // [POST] 登入並檢查帳戶及密碼雜湊值是否相符。
  verify: 'api/login.php' // [POST] 驗證使用者的 Cookie token 是否有效。
}
```

（雖然預設似乎就是這個）

## 授權條款
MIT LICENSE

## 作者
pan93412 (2019)