#!/usr/bin/env bash

source ../.common/bootstrap.sh dev

docker network create common || true

docker-compose --project-name $PROJECT_NAME kill
docker-compose --project-name $PROJECT_NAME rm -f
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose --project-name "$PROJECT_NAME" build --pull
docker-compose --project-name $PROJECT_NAME up -d

docker volume prune -f
docker system prune -f
