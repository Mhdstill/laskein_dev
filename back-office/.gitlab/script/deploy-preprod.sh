#!/bin/bash
docker build -t back-office-app:new .
docker tag back-office-app:new back-office-app:latest
docker compose up -d