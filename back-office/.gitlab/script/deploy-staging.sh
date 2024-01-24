#!/bin/bash
docker build -t back-office-staging:new .
docker tag back-office-staging:new back-office-staging:latest
docker compose up -d