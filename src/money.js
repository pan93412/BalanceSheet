const Cookie = require('js-cookie')
const siteAPI = require('./moneyAPI.js')

/**
 * 使用 POST 發送請求
 * @param {string} method「什麼」成功了？
 * @param {object} data 要傳出的資料
 */
async function doRequest (method, data) {
  // 因向後相容性而使用此折衷方法。
  const db = new FormData()
  for (const d in data) {
    db.append(d, data[d])
  }

  const resultRaw = await fetch(siteAPI.modifyData, {
    method: 'POST',
    body: db
  })

  const result = await resultRaw.text()

  if (result === 'OK') {
    alert(method + '成功！ :)')
    location.reload()
  } else alert(`好像有問題…… 伺服器回傳了：\n${data}\n若您無法排除，請告訴管理員。`)
}

/**
 * 提示文字。
 *
 * @param {string} type 類型 ex. 名稱、描述
 * @param {string} format 格式 ex. 民國年
 * @param {bool} isRequired 是否為必填？
 * @param {string} usedOn 用於「新增」還是「修改」？提示文字有稍微不同。
 * ex.「add」「edit」
 * @param {string} rawVal 原始值。default = ''
 * @return {string} 使用者輸入的內容
 */
function promptMsg (type, format, isRequired, usedOn, rawVal = '') {
  var optionalTxt
  if (!isRequired && usedOn === 'add') optionalTxt = '可選擇不填，不填則會使用預設值。'
  else if (!isRequired && usedOn === 'edit') optionalTxt = `可選擇不填。不填則會使用原本值：\n「${rawVal}」`
  else if (isRequired) optionalTxt = '必須填寫'
  else throw new Error('程式邏輯發生錯誤：請通知程式作者。')

  const userVal = prompt(`請輸入${type}。\n格式：${format}\n${optionalTxt}`)

  if (userVal === '' && isRequired) {
    alert('您未填寫必填項！請重填。')
    throw new Error(`使用者未填寫必填項：${type}`)
  }

  return userVal !== '' ? userVal : rawVal
}

/**
 * 新增項目至資料庫。
 */
function insertToDB () {
  if (!confirm('是否新增？')) return null // 確認

  doRequest('新增', {
    _METHOD: 'POST',
    name: promptMsg('名稱', '就是……名稱？', true, 'add'),
    desc: promptMsg('描述', '就是……描述？', false, 'add'),
    type: promptMsg('類型', '就是……類型？', false, 'add'),
    amount: promptMsg('金額', '新台幣（不需單位）', true, 'add'),
    date: promptMsg('日期', '年-月-日', true, 'add')
  })
}

/**
 * 修改資料庫的項目。
 *
 * @param {Object} db 原始資料庫
 */
function editDB (db) {
  if (!confirm('是否修改此項目？')) return null // 確認

  doRequest('修改', {
    _METHOD: 'PUT',
    id: db.id,
    name: promptMsg('名稱', '原來的格式R', false, 'edit', db.name),
    desc: promptMsg('描述', '原來的格式R', false, 'edit', db.desc),
    type: promptMsg('類型', '原來的格式R', false, 'edit', db.type),
    amount: promptMsg('金額', '新台幣（不需單位）', false, 'edit', db.amount),
    date: promptMsg('日期', '年-月-日', false, 'edit', db.date)
  })
}

/**
 * 從資料庫刪除項目。
 *
 * @param {Object} db 原始資料庫
 */
function deleteFromDB (db) {
  if (!confirm(`是否刪除此項？\n名稱：${db.name}\n描述：${db.desc}\n金額：${db.amount}\n日期：${db.date}`)) {
    return null
  }

  doRequest('刪除', { _METHOD: 'DELETE', toDel: db.id })
}

/**
 * 將點選事件 action 新增至元件 elem。
 * @param {string} elem 元件 (ex. `.btn`)
 * @param {Function} action 事件
 */
function addClickEvent (elem, action) {
  document.querySelector(elem).addEventListener('click', action)
}

/**
 * 將 db 的資料寫入頁面。
 *
 * @param {Object} db 資料庫
 * @param {Boolean} authed 是否已經登入？(Cookie)
 * PHP 實作範例： `Cookie.get('authed') === 'YES'`
 * @return 資料庫的剩餘值，可用來計算剩餘金額。
 */
function appendToPage (db, authed) {
  console.log('qwq')
  document.querySelector('#infoTable')
    .insertAdjacentHTML('afterbegin', `<tr style='color: black'>
      <td scope="col" width="5%">${db.id}</td>
      <td scope="col" width="15%">${db.name}</td>
      <td scope="col" width="20%">${db.desc}</td>
      <td scope="col" width="10%">${db.type}</td>
      <td scope="col" width="10%">${db.amount} NTD</td>
      <td scope="col" width="10%">${db.date}</td>
      <td scope="col" width="20%" style='color: white'>
        <a class="btn btn-info btn-sm" id='edit-${db.id}'>編輯</a>
        <a class="btn btn-danger btn-sm" id='del-${db.id}'>刪除</a>
      </td></tr>`)

  if (authed) {
    addClickEvent(`#edit-${db.id}`, () => { editDB(db) })
    addClickEvent(`#del-${db.id}`, () => { deleteFromDB(db) })
  } else {
    const loginAlert = () => { alert('請先登入，才可操作 qwq') }
    addClickEvent(`#edit-${db.id}`, loginAlert)
    addClickEvent(`#del-${db.id}`, loginAlert)
  }

  return Number(db.amount) // 剩餘金額
}

/**
 * 移除所有 Cookie。
 */
function removeCookies () {
  for (const cookieName in Cookie.get()) {
    Cookie.remove(cookieName)
  }
}

async function main () {
  const dataSetSource = await fetch(
    siteAPI.getAllData + `?timestamp=${Date.now()}`,
    {
      method: 'GET'
    }
  )

  const dataSet = await dataSetSource.json()

  const tokenDat = new FormData()
  tokenDat.append('token', Cookie.get('token'))

  const authedSource = await fetch(
    siteAPI.verify,
    {
      method: 'POST',
      body: tokenDat
    }
  )

  // 伺服端是否已經核可認證？
  const authed = await authedSource.text()
  const isAuthed = authed === 'PASS'

  console.log(isAuthed)
  let remain = 0 // 目前剩餘的錢。

  // 將資料庫中的收支資料寫至網頁
  for (const data of dataSet) remain += appendToPage(data, isAuthed)

  // 接著將計算的剩餘金額寫至網頁。
  document.querySelector('#remainAmount').innerHTML = remain + ' NTD'

  // 接著檢查登入情況。
  if (isAuthed) { // 如果已經驗證
    addClickEvent('#addEntry', () => { insertToDB() }) // 「新增項目」有作用了！

    // 寫入「歡迎 xxx！[登出]」字樣至網頁。
    document.querySelector('#nav').insertAdjacentHTML('beforeend', `<p class='site-logo py-3'>
    歡迎 <b>${decodeURIComponent(Cookie.get('user'))}</b>！
    <a href='javascript:void(0)' id='logout-link'>登出</a></p>`)

    // 接著使登出連結有作用。
    addClickEvent('#logout-link', () => {
      removeCookies()
      location.reload()
    })
  } else {
    // lambda 函數：顯示「請先登入」字樣。
    const loginAlert = () => { alert('請先登入，才可操作 qwq') }

    // 然後，對 `addEntry` 新增項目按鈕新增「請先登入」指示。
    addClickEvent('#addEntry', loginAlert)

    // 最後，將原本隱藏在網頁的 #notLogined 的
    // `display: none` 刪除即完成。
    document.querySelector('#notLogined').removeAttribute('style')
  }
}

// 入口點
main()
