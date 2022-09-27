#!/bin/bash

# REPOSITORY=/home/ubuntu/app

echo "> pm2 종료"
cd $REPOSITORY
sudo /home/ubuntu/.nvm/versions/node/v18.9.1/bin/pm2 kill

echo "> pm2 실행"
cd $REPOSITORY
sudo /home/ubuntu/.nvm/versions/node/v18.9.1/bin/pm2 start server.js

echo "> pm2 실행 확인"
sudo /home/ubuntu/.nvm/versions/node/v18.9.1/bin/pm2 list
