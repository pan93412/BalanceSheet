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
