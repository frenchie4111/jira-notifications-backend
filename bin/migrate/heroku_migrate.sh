#!/bin/bash

npm install -g sequelize-cli
node heroku_create_config.js
sequelize db:migrate --env production --config heroku_config.json
rm heroku_config.json