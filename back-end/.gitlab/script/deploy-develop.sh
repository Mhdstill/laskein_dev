#!/bin/bash
npx prisma generate
npx prisma db push
docker build -t lasken-api-develop:new .
docker tag lasken-api-develop:new lasken-api-develop:latest
docker compose up -d