#!/bin/bash

# Source configuration
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source "$SCRIPT_DIR/config.sh"

# Parse arguments
DEV=false

while [[ "$#" -gt 0 ]]; do
  case $1 in
  --dev) DEV=true ;;
  *)
    echo "Unknown parameter: $1"
    exit 1
    ;;
  esac
  shift
done

echo "Running migrations..."

# Handle development environment
if [ "$DEV" = true ]; then
  # Start PostgreSQL if needed
  ./bin/postgres.sh run
  export POSTGRES_URL=$(./bin/postgres.sh endpoint)
  echo "DEV mode: Using POSTGRES_URL=$POSTGRES_URL"
fi

# Check if POSTGRES_URL is set
if [ -z "$POSTGRES_URL" ]; then
  echo "Error: POSTGRES_URL environment variable is not set"
  echo "For development, run with --dev flag or set POSTGRES_URL"
  exit 1
fi

# Run the migrations
uv run alembic upgrade head

# Exit the script
exit 0
