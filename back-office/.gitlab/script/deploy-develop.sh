#!/bin/bash
docker build -t back-office-develop:new .
docker tag back-office-develop:new back-office-develop:latest
docker compose up -d