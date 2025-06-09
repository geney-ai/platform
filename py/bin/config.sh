#!/bin/bash

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/.." && pwd )"

# Function to read value from YAML file
# Usage: read_yaml_value "key.subkey"
read_yaml_value() {
    local key="$1"
    local file="$PROJECT_ROOT/hcp.yaml"
    
    # For simple top-level keys
    if [[ "$key" == "vault.apps.dev" ]]; then
        awk '/^vault:/{f=1} f && /apps:/{g=1} g && /dev:/{print $2; exit}' "$file"
    fi
}

# Export app configuration
export APP_NAME=generic
export DEV_SERVER_PORT=8000
export VAULT_APP_DEV=generic-dev

function print_config {
    echo "APP_NAME: $APP_NAME"
    echo "VAULT_APP_DEV: $VAULT_APP_DEV"
}

# if directly called, print the config
if [ "$0" == "$BASH_SOURCE" ]; then
    print_config
fi