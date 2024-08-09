#!/bin/bash

cd $REMOTE_DESTINATION_PATH
pwd
ls
source ~/.nvm/nvm.sh
npm i
pm2 restart $REPO_SLUG --update-env
