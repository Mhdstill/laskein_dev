#!/bin/bash
docker build -t front-office-staging:new .
docker tag front-office-staging:new front-office-staging:latest
docker compose up -d