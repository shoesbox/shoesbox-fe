#!/usr/bin/env bash

 echo "> FE 배포"
 sudo cp -rf /home/share/html/build/dist/* /var/www/html
