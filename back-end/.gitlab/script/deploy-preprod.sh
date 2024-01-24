#!/bin/bash
npx prisma generate
npx prisma db push
docker build -t lasken-api-preprod:new .
docker tag lasken-api-preprod:new lasken-api-preprod:latest
docker compose up -d --remove-orphans