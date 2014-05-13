#!/usr/bin/env bash
rm -rf output
mkdir output
cp -r js output/js
cp -r css output/css
cp -r img output/img
cp -r index.html output
cp favicon.ico output
rm -rf ~/Desktop/sophiekaars.com
mv output ~/Desktop/sophiekaars.com
