#!/bin/bash

uname="root"
pwd=""

host="localhost"

new_database="Brindon"

create_dbase="CREATE DATABASE IF NOT EXISTS $new_database DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;"

mysql -u $uname -p $host -e "$create_dbase"

echo "Database $new_database created successfully!"