#!/bin/bash
set -e # Exit immediately if a command exits with a non-zero status.

# Source configuration
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source "$SCRIPT_DIR/config.sh"

# check for the auto flag
MANUAL=false
if [ "$1" = "--manual" ]; then
    MANUAL=true
    shift # Remove --auto from arguments so $1 becomes the description
fi

# Start PostgreSQL if needed (for development)
./bin/postgres.sh run
export POSTGRES_URL=$(./bin/postgres.sh endpoint)
echo "Using POSTGRES_URL: $POSTGRES_URL"

# Get the migration description
DESCRIPTION=$1
if [ -z "$DESCRIPTION" ]; then
    echo "Error: Please provide a description for the migration."
    exit 1
fi

# Generate alembic migrations
echo "Generating migration..."

# Run alembic revision and capture output
if [ "$MANUAL" = true ]; then
    uv run alembic revision -m "$DESCRIPTION"
else
    uv run alembic revision --autogenerate -m "$DESCRIPTION"
fi

exit 0
