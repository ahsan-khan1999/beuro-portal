#!/bin/bash

cd //srv/www/buero-portal
pwd
ls
source ~/.nvm/nvm.sh
git pull
npm i
pm2 restart buero-frontend