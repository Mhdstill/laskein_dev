#!/bin/bash
docker build -t front-office-angular-app:new .
docker tag front-office-angular-app:new front-office-angular-app:latest
docker compose up -d