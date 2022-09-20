#!/bin/bash

REPOSITORY=/home/ubuntu/app/shoesbox-vanilla

echo "> npm install"

cd $REPOSITORY
npm install express --save

echo "> node.js 배포"

nohup node server.js
