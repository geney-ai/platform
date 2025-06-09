#!/bin/bash

# Source configuration
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source "$SCRIPT_DIR/config.sh"
source "$SCRIPT_DIR/../../bin/vault"

# start db flag
START_DB=false

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    -d|--db)
      START_DB=true
      shift
      ;;
    -h|--help)
      echo "Usage: $0 [options]"
      echo ""
      echo "Options:"
      echo "  -d, --db          Start PostgreSQL"
      echo "  -h, --help        Show this help message"
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      echo "Use --help for usage information"
      exit 1
      ;;
  esac
done

# Set environment variables
export DEV_SERVER_HOST=localhost
export HOST_NAME=http://localhost:${DEV_SERVER_PORT}
export LISTEN_ADDRESS=0.0.0.0
export LISTEN_PORT=${DEV_SERVER_PORT}
export SERVICE_SECRET='not-a-very-secret-secret'
export DEBUG=True
export DEV_MODE=True
export LOG_PATH=

# Start PostgreSQL
if [ "$START_DB" = true ]; then
    echo "Starting PostgreSQL..."
    ./bin/postgres.sh run
    # Give PostgreSQL a moment to start
    sleep 2
fi
export POSTGRES_URL=$(./bin/postgres.sh endpoint)

# Start the main application
export VAULT_APP=${VAULT_APP_DEV}
run_with_vault uv run src/__main__.py

# Exit the script
exit 0
