#!/bin/bash

# Make the script executable: chmod +x stop.sh

echo "🛑 Stopping Docker containers for dev and prod profiles..."
docker compose --profile dev down
docker compose --profile prod down