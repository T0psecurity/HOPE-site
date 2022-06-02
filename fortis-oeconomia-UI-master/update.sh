#!/bin/sh
unzip out.zip
rm -rf public_html
mv out public_html
rm out.zip
