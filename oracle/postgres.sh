#!/usr/bin/env bash
docker ps | grep 'trustory-postgres' && docker stop trustory-postgres
docker container ls -a | grep 'trustory-postgres' && docker rm trustory-postgres
docker run -d -p 5430:5432 --name trustory-postgres -e POSTGRES_PASSWORD=prisma postgres:11