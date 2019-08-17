#!/usr/bin/bash

echo "-> 正在封裝……"
rm balanceSheet.tar.gz
tar -czvf balanceSheet.tar.gz dist/*

echo "OK! 完成封裝作業，成品為 balanceSheet.tar.gz。"