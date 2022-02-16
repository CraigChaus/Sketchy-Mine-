#!/bin/bash
echo "Redeploying SketchyMine backend"
cd /home/gitlab/sketchymine
docker pull registry.gitlab.com/saxion.nl/server-clients/dhi2v.so2/backend:latest
docker-compose up -d