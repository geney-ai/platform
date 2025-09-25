#!/bin/bash

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/../.." && pwd )"

# source the project config
source "$PROJECT_ROOT/.env.project"

# Export app configuration
export APP_NAME=${PROJECT_NAME}-py
export DEV_SERVER_PORT=8000

function print_config {
    echo "APP_NAME: $APP_NAME"
}

# if directly called, print the config
if [ "$0" == "$BASH_SOURCE" ]; then
    print_config
fi