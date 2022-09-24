#!/bin/bash
REPOSITORY=/home/ec2-user/build
sudo pm2 kill
cd $REPOSITORY

sudo rm -rf /shoesbox-fe
