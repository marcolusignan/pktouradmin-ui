#!/bin/bash

# Make the script executable: chmod +x start.sh

case "$1" in
  --docker-dev)
    echo "🔧 Running Angular app in Docker (dev profile)..."
    docker compose --profile dev up --build
    ;;
  --docker-prod)
    echo "🚀 Running Angular app in Docker (prod profile)..."
    docker compose --profile prod up --build
    ;;
  *)
    echo "💻 Running Angular app locally with npm..."
    npm run start
    ;;
esac