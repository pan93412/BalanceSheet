# 「收支表」前端使用說明
歡迎使用收支表的前端 :P

## 初始化
可選擇 Release 的 `pre-compiled` 預編譯版本，或是自己從 Git 庫 clone
回來並輸入以下幾句（需先安裝 `yarn`）：

> `yarn run package` 需要 bash、GNU tar 及 Git，
> 若無就直接把所有目錄（除 `node_modules`）及檔案上傳上去即可。

```bash
$ yarn --dev
$ yarn run genPage
$ yarn run build
$ yarn run package
```

## 使用
將 `yarn run package` 產生的 `balanceSheet.tar.gz` 上傳至
您的伺服器並解壓，之後直接進去 `index.html`。

## 授權條款
MIT LICENSE

## 作者
pan93412 (2019)