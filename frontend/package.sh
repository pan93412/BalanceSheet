#!/usr/bin/bash

echo "-> 正在封裝……"
rm balanceSheet.tar.gz
rm -rf balanceSheet

mkdir balanceSheet
cp dist/* balanceSheet
cp -r images balanceSheet/images
cp -r ../api balanceSheet/api

tar -czvf balanceSheet.tar.gz balanceSheet
rm -rf balanceSheet

echo "OK! 完成封裝作業，成品為 balanceSheet.tar.gz。"