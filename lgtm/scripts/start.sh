#!/bin/bash

# Navigate to the LGTM directory
cd "$(dirname "$0")/.."

# Create required directories
mkdir -p config/{grafana,mimir,tempo}

# Start the stack
docker-compose up -d

# Wait for services to be ready
echo "Waiting for services to start..."
sleep 10

echo "LGTM Stack is ready!"
echo "Access Grafana at: http://localhost:3000"
echo "Mimir endpoint: http://localhost:9009"
echo "Tempo endpoint: http://localhost:3200"
