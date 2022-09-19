#!/bin/bash
REPOSITORY=/home/ubuntu/shoesbox-vanilla

cd $REPOSITORY
sudo cp -r dist/* /var/www/html/
sudo service nginx restart

cd $REPOSITORY
cd server
yarn install
pm2 kill
yarn prod
