# !/usr/bin/env bash

# Env Local
SOURCE_ENV="${PWD}/.env" &&
. $SOURCE_ENV &&
export $(cut -d= -f1 $SOURCE_ENV) &&

node_modules/.bin/nodemon src/index.ts --inspect=0.0.0.0:10001
