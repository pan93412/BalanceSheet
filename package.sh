#!/usr/bin/bash

echo "-> 正在建立封裝分支……"
git branch -D makePackage
git checkout -b makePackage

echo "-> 正在封裝……"
rm balanceSheet.tar.gz
tar -czvf balanceSheet.tar.gz --exclude='node_modules' --exclude='pug_src' --exclude='src' --exclude-caches-all *

echo "OK! 完成封裝作業，成品為 balanceSheet.tar.gz。"
git checkout master