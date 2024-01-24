#!/bin/bash
docker build -t front-office-develop:new .
docker tag front-office-develop:new front-office-develop:latest
docker compose up -d