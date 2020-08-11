#!/usr/bin/env bash

docker rm -f mysql
docker run --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=forchange -d mysql:5.7
