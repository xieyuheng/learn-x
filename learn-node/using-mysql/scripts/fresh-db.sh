#!/usr/bin/env bash

echo $DATABASE

mysql -u root -h 127.0.0.1 -pforchange -e "DROP DATABASE IF EXISTS $DATABASE;"
mysql -u root -h 127.0.0.1 -pforchange -e "CREATE DATABASE $DATABASE;"
# mysql -u root -h 127.0.0.1 -pforchange --database $DATABASE
