#!/usr/bin/env bash

source ../.common/bootstrap.sh dev

docker-compose --project-name $PROJECT_NAME down

docker rmi $(docker images -q)
docker volume prune -f
docker system prune -f
