#!/usr/bin/env bash

# Environment mappings for HCP Vault to Terraform variables
# Format: HCP_VAULT_SECRET_NAME:terraform_var_name
# 
# These mappings define how HCP Vault secrets are exposed as Terraform variables.
# When running terraform, each HCP secret will be exported as TF_VAR_<terraform_var_name>

# Array of mappings
MAPPINGS=(
  # DigitalOcean credentials
  "DIGITALOCEAN_TOKEN:do_token"
  
  # Cloudflare
  "CLOUDFLARE_API_TOKEN:cloudflare_api_token"
)

# Function to print all mappings (useful for debugging)
print_mappings() {
  echo "=== HCP Vault to Terraform Variable Mappings ==="
  for mapping in "${MAPPINGS[@]}"; do
    [[ -z "$mapping" || "$mapping" =~ ^[[:space:]]*# ]] && continue
    IFS=':' read -r hcp_var tf_var <<< "$mapping"
    echo "  $hcp_var -> TF_VAR_$tf_var"
  done
}

# If script is executed directly, print mappings
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  print_mappings
fi