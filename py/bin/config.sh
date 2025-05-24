#!/bin/bash

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/.." && pwd )"

# Function to read value from YAML file
# Usage: read_yaml_value "key.subkey"
read_yaml_value() {
    local key="$1"
    local file="$PROJECT_ROOT/config.yaml"
    
    # For simple top-level keys
    if [[ "$key" == "app_name" ]]; then
        grep "^app_name:" "$file" | sed 's/app_name: *//'
    elif [[ "$key" == "vault.project_id" ]]; then
        awk '/^vault:/{f=1} f && /project_id:/{print $2; exit}' "$file"
    elif [[ "$key" == "vault.apps.dev" ]]; then
        awk '/^vault:/{f=1} f && /apps:/{g=1} g && /dev:/{print $2; exit}' "$file"
    elif [[ "$key" == "container.postgres_image" ]]; then
        awk '/^container:/{f=1} f && /postgres_image:/{print $2; exit}' "$file"
    elif [[ "$key" == "dev_server.port" ]]; then
        awk '/^dev_server:/{f=1} f && /port:/{print $2; exit}' "$file"
    elif [[ "$key" == "dev_server.debug" ]]; then
        awk '/^dev_server:/{f=1} f && /debug:/{print $2; exit}' "$file"
    fi
}

# Export app configuration
export APP_NAME=$(read_yaml_value "app_name")
export VAULT_PROJECT_ID=$(read_yaml_value "vault.project_id")
export VAULT_APP_DEV=$(read_yaml_value "vault.apps.dev")

export DEV_SERVER_PORT=$(read_yaml_value "dev_server.port")
export DEV_SERVER_DEBUG=$(read_yaml_value "dev_server.debug")

function print_config {
    echo "APP_NAME: $APP_NAME"
    echo "VAULT_PROJECT_ID: $VAULT_PROJECT_ID"
    echo "VAULT_APP_DEV: $VAULT_APP_DEV"
    echo "DEV_SERVER_PORT: $DEV_SERVER_PORT"
    echo "DEV_SERVER_DEBUG: $DEV_SERVER_DEBUG"
}

# if directly called, print the config
if [ "$0" == "$BASH_SOURCE" ]; then
    print_config
fi