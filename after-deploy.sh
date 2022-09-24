#!/bin/bash

REPOSITORY=/home/ec2-user/build

echo "> pm2 실행"

cd $REPOSITORY

pm2 list
