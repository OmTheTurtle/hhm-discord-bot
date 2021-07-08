#!/bin/sh

git checkout main &&
git pull --rebase &&
docker-compose up -d --build
