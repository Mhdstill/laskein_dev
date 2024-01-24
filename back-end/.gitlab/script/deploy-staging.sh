#!/bin/bash
npx prisma generate
npx prisma db push
docker build -t lasken-api-staging:new .
docker tag lasken-api-staging:new lasken-api-staging:latest
docker compose up -d --remove-orphans