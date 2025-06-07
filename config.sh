#!/usr/bin/env bash

# Global configuration script for the entire repository
# This script can be sourced from any subdirectory to load common configuration

# Get the directory where this script is located (repo root)
REPO_ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Function to read value from YAML file
# Usage: read_yaml_value "key.subkey" [yaml_file]
read_yaml_value() {
    local key="$1"
    local file="${2:-$REPO_ROOT/config.yaml}"
    
    # Check if file exists
    if [[ ! -f "$file" ]]; then
        echo "Error: Configuration file not found: $file" >&2
        return 1
    fi
    
    # For simple top-level keys
    if [[ "$key" == "app_name" ]]; then
        grep "^app_name:" "$file" | sed 's/app_name: *//'
    elif [[ "$key" == "vault.project_id" ]]; then
        awk '/^vault:/{f=1} f && /project_id:/{print $2; exit}' "$file"
    elif [[ "$key" == "vault.organization_id" ]]; then
        awk '/^vault:/{f=1} f && /organization_id:/{print $2; exit}' "$file"
    elif [[ "$key" == "vault.apps.dev" ]]; then
        awk '/^vault:/{f=1} f && /apps:/{g=1} g && /dev:/{print $2; exit}' "$file"
    elif [[ "$key" == "vault.apps.staging" ]]; then
        awk '/^vault:/{f=1} f && /apps:/{g=1} g && /staging:/{print $2; exit}' "$file"
    elif [[ "$key" == "vault.apps.production" ]]; then
        awk '/^vault:/{f=1} f && /apps:/{g=1} g && /production:/{print $2; exit}' "$file"
    elif [[ "$key" == "container.postgres_image" ]]; then
        awk '/^container:/{f=1} f && /postgres_image:/{print $2; exit}' "$file"
    elif [[ "$key" == "dev_server.port" ]]; then
        awk '/^dev_server:/{f=1} f && /port:/{print $2; exit}' "$file"
    elif [[ "$key" == "dev_server.debug" ]]; then
        awk '/^dev_server:/{f=1} f && /debug:/{print $2; exit}' "$file"
    fi
}

# Export common paths
export REPO_ROOT
export PY_ROOT="$REPO_ROOT/py"
export TS_ROOT="$REPO_ROOT/ts"
export IAC_ROOT="$REPO_ROOT/iac"

# Export app configuration
export APP_NAME=$(read_yaml_value "app_name")
export VAULT_PROJECT_ID=$(read_yaml_value "vault.project_id")
export VAULT_ORGANIZATION_ID=$(read_yaml_value "vault.organization_id")
export VAULT_APP_DEV=$(read_yaml_value "vault.apps.dev")
export VAULT_APP_STAGING=$(read_yaml_value "vault.apps.staging")
export VAULT_APP_PRODUCTION=$(read_yaml_value "vault.apps.production")

# Function to get HCP Vault app name for environment
get_vault_app() {
    local env="$1"
    case "$env" in
        dev|development)
            echo "$VAULT_APP_DEV"
            ;;
        staging|stage)
            echo "$VAULT_APP_STAGING"
            ;;
        production|prod)
            echo "$VAULT_APP_PRODUCTION"
            ;;
        *)
            echo "Error: Unknown environment: $env" >&2
            return 1
            ;;
    esac
}

# Function to run command with HCP Vault secrets
run_with_vault() {
    local env="$1"
    shift
    local app=$(get_vault_app "$env")
    
    if [[ -z "$app" ]]; then
        echo "Error: No vault app configured for environment: $env" >&2
        return 1
    fi
    
    hcp vault-secrets run --project="$VAULT_PROJECT_ID" --app="$app" -- "$@"
}

# Function to print current configuration
print_config() {
    echo "=== Repository Configuration ==="
    echo "Repository Root: $REPO_ROOT"
    echo "App Name: $APP_NAME"
    echo ""
    echo "=== HCP Vault Configuration ==="
    echo "Organization ID: $VAULT_ORGANIZATION_ID"
    echo "Project ID: $VAULT_PROJECT_ID"
    echo "Apps:"
    echo "  Dev: $VAULT_APP_DEV"
    echo "  Staging: $VAULT_APP_STAGING"
    echo "  Production: $VAULT_APP_PRODUCTION"
    echo ""
    echo "=== Directory Structure ==="
    echo "Python Root: $PY_ROOT"
    echo "TypeScript Root: $TS_ROOT"
    echo "IaC Root: $IAC_ROOT"
}

# If script is executed directly, print configuration
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    print_config
fi