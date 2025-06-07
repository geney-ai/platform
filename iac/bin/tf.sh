#!/usr/bin/env bash

set -e

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
IAC_ROOT="$(dirname "$SCRIPT_DIR")"
REPO_ROOT="$(dirname "$IAC_ROOT")"

# Source the global configuration
source "$REPO_ROOT/config.sh"

# Source the environment mappings
source "$SCRIPT_DIR/env-mappings.sh"

# Default vault app for terraform (can be overridden)
DEFAULT_TF_VAULT_APP="${TF_VAULT_APP:-generic-tf}"

# Function to show usage
usage() {
  echo "Run terraform commands with HCP Vault secret injection"
  echo ""
  echo "Usage: $0 <env-dir> <terraform-command> [args]"
  echo ""
  echo "Environment variables:"
  echo "  TF_VAULT_APP - HCP Vault app to use (default: $DEFAULT_TF_VAULT_APP)"
  echo ""
  echo "Available environments in $IAC_ROOT/envs/:"
  for dir in "$IAC_ROOT/envs"/*; do
    if [[ -d "$dir" ]]; then
      echo "  - $(basename "$dir")"
    fi
  done
  echo ""
  echo "Examples:"
  echo "  $0 production plan"
  echo "  TF_VAULT_APP=my-tf-app $0 registry apply"
  echo "  $0 production destroy"
  exit 1
}

# Check arguments
if [[ $# -lt 2 ]]; then
  usage
fi

ENV_NAME="$1"
shift

# Set environment directory
ENV_DIR="$IAC_ROOT/envs/$ENV_NAME"

# Check if environment directory exists
if [[ ! -d "$ENV_DIR" ]]; then
  echo "Error: Environment directory not found: $ENV_DIR"
  usage
fi

# Use configured or default vault app
VAULT_APP="${TF_VAULT_APP:-$DEFAULT_TF_VAULT_APP}"

# Build export commands for environment variables
export_commands=""
for mapping in "${MAPPINGS[@]}"; do
  echo "Mapping: $mapping"
  # Skip comments and empty lines
  [[ -z "$mapping" || "$mapping" =~ ^[[:space:]]*# ]] && continue
  
  # Split mapping into HCP var and TF var
  IFS=':' read -r hcp_var tf_var <<< "$mapping"
  
  # Trim whitespace
  hcp_var="${hcp_var## }"
  hcp_var="${hcp_var%% }"
  tf_var="${tf_var## }"
  tf_var="${tf_var%% }"
  
  export_commands="${export_commands}export TF_VAR_${tf_var}=\${${hcp_var}}; "
done

# Run terraform using the vault script
echo "Running terraform in $ENV_NAME with vault app: $VAULT_APP"
"$REPO_ROOT/bin/vault" "$VAULT_APP" -- sh -c "cd '$ENV_DIR' && $export_commands terraform $*"