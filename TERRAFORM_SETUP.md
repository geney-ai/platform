# Terraform Cloud Setup Guide

This guide explains how to set up Terraform Cloud workspaces for managing your infrastructure across multiple environments.

## What is Terraform Cloud?

Terraform Cloud is HashiCorp's managed service that provides:
- **Remote State Storage**: Secure, versioned storage for your Terraform state files
- **State Locking**: Prevents concurrent modifications and state corruption
- **Team Collaboration**: Share infrastructure state across your team
- **Audit Trail**: Track who made what changes and when
- **CLI-Driven Workflow**: Run Terraform from your local machine while storing state remotely

## Prerequisites

### Required Tools

1. **Terraform CLI**
   ```bash
   # macOS
   brew install terraform

   # Or download from
   https://developer.hashicorp.com/terraform/downloads
   ```

2. **1Password CLI** (optional, for vault integration)
   ```bash
   brew install --cask 1password-cli
   ```

### Required Credentials

#### Terraform Cloud API Token

**What is it?** An authentication token that allows programmatic access to Terraform Cloud for creating organizations, workspaces, and managing state.

**How to get it:**
1. Go to [Terraform Cloud](https://app.terraform.io)
2. Sign up or log in to your account
3. Navigate to **User Settings** → **Tokens**
4. Click **Create an API token**
5. Name it (e.g., "Platform Automation")
6. Copy the token (save it securely - it won't be shown again!)

**Option 1: Add to 1Password (Recommended)**
- Vault: `cloud-providers` (or whatever is set as `CLOUD_VAULT` in `.env.project`)
- Item name: `TERRAFORM_CLOUD_API_TOKEN`
- Fields:
  - `credential`: Your API token

**Option 2: Use terraform login**
```bash
terraform login
# Follow the prompts to authenticate
```

### Project Configuration

Ensure `.env.project` contains:
```bash
PROJECT_NAME=your-project-name
DEFAULT_STAGE=development
STAGES=development,production  # Comma-separated list
CLOUD_VAULT=cloud-providers    # 1Password vault name for cloud credentials
```

## What Gets Created

The script sets up a complete Terraform Cloud environment for managing infrastructure across multiple stages:

### 1. Terraform Cloud Organization
**Purpose:** Container for all your Terraform workspaces

**What's created:**
- Name: `{PROJECT_NAME}-org` (e.g., `myapp-org`)
- Email: `admin@{PROJECT_NAME}-org.local` (placeholder)

**Why it matters:**
- Provides team collaboration features
- Centralizes all your workspaces
- Enables cost estimation and policy enforcement
- Offers private module registry

### 2. Terraform Cloud Workspaces
**Purpose:** Isolated environments for each stage of your infrastructure

**What's created automatically:**
- One workspace for each non-development stage in your `STAGES` configuration
- Name: `{PROJECT_NAME}-{stage}` (e.g., `geney-production`)
- **Execution mode: Local** - Terraform runs on your machine
- **Remote state: Enabled** - State stored in Terraform Cloud
- **Auto-apply: Disabled** - Manual approval required
- **Global state sharing: Enabled** - Share state across workspaces

**Important:** Workspaces are fully parameterized by `.env.project`:
- Only stages listed in `STAGES` will have workspaces
- Development stage is automatically excluded (local development)
- No manual workspace creation - ensures consistency

**Why this configuration:**
- **Local execution** = Full control, use local tools and credentials
- **Remote state** = Team collaboration, versioning, and locking
- **Manual approval** = Prevent accidental changes
- **Per-stage workspaces** = Complete environment isolation

### 3. Backend Configuration Files
**Purpose:** Connect your local Terraform to the remote workspaces

**Created in `terraform/backend-{stage}.tf`:**
```hcl
terraform {
  cloud {
    organization = "your-project-org"

    workspaces {
      name = "your-project-production"
    }
  }
}
```

**Usage:**
- One file per environment
- Switch between environments by using different backend configs
- Keeps code DRY while maintaining separation

## Usage

### Quick Start

```bash
# Full initialization (creates organization and all workspaces)
make tf-cloud init

# Check current status
make tf-cloud status

# List all workspaces
make tf-cloud list
```

### Available Commands

```bash
# Using Make (recommended)
make tf-cloud init            # Initialize everything (org + all workspaces)
make tf-cloud status          # Show current status
make tf-cloud list            # List all workspaces
make tf-cloud org             # Create organization only
make tf-cloud help            # Show help

# Direct script usage
./bin/tf-cloud init           # Full initialization
./bin/tf-cloud status         # Show status
./bin/tf-cloud org            # Create organization only
./bin/tf-cloud list           # List workspaces
./bin/tf-cloud help           # Show help
```

**Note:** Workspaces are automatically created based on the `STAGES` configuration in `.env.project`. The script will create workspaces for all non-development stages (e.g., production). You cannot create individual workspaces manually - they are fully parameterized by your project configuration.

## Terraform Workflow

After initialization, use Terraform like this:

```bash
# 1. Navigate to terraform directory
cd terraform

# 2. Create your infrastructure code
cat > main.tf << 'EOF'
# Example: Create an S3 bucket
provider "aws" {
  region = "us-west-2"
}

resource "aws_s3_bucket" "example" {
  bucket = "${var.project_name}-${var.environment}"

  tags = {
    Project     = var.project_name
    Environment = var.environment
  }
}

variable "project_name" {
  default = "myapp"
}

variable "environment" {
  default = "production"
}
EOF

# 3. Initialize with backend config for your target environment
terraform init -backend-config=backend-production.tf

# 4. Plan your changes
terraform plan

# 5. Apply changes (requires confirmation)
terraform apply
```

## Working with Multiple Environments

Each environment has its own workspace and state:

```bash
# Production deployment
terraform init -backend-config=backend-production.tf
terraform plan
terraform apply

# Staging deployment (if you have a staging workspace)
terraform init -reconfigure -backend-config=backend-staging.tf
terraform plan
terraform apply
```

## Using with 1Password Vault

To run Terraform with secrets from vault:

```bash
# Source the vault functions
source bin/vault

# Run Terraform with vault secrets
run_with_vault -- terraform plan
run_with_vault -- terraform apply

# Or export secrets for the session
op run --env-file=".env.vault" --no-masking -- bash
terraform plan
terraform apply
```

## Benefits of This Setup

1. **State Management**
   - Automatic backups
   - State versioning and history
   - Encrypted storage
   - Locking to prevent conflicts

2. **Team Collaboration**
   - Shared access to state
   - Audit trail of changes
   - Role-based access control
   - Consistent environments

3. **Safety Features**
   - State locking prevents corruption
   - Manual approval for production
   - Environment isolation
   - Rollback capability

4. **Developer Experience**
   - Run from local machine
   - Use familiar tools
   - Full control over execution
   - Easy environment switching

## Troubleshooting

### "Organization already exists"
This is fine! The script handles existing organizations gracefully.

### "Terraform Cloud token not found"
Either:
1. Add token to 1Password vault (recommended)
2. Run `terraform login` to authenticate manually

### "Workspace already exists"
The script will use the existing workspace. This is expected behavior.

### Check what exists
```bash
# See current status
make tf-cloud status

# List all workspaces
make tf-cloud list
```

## Security Notes

1. **Never commit tokens** to Git
2. **Use separate workspaces** for each environment
3. **Enable two-factor authentication** on Terraform Cloud
4. **Rotate API tokens** regularly
5. **Use read-only tokens** where possible

## Next Steps

After setting up Terraform Cloud:

1. **Write Infrastructure Code**
   - Define your resources in `terraform/`
   - Use variables for environment-specific values

2. **Set Up CI/CD**
   - Automate plan/apply in your pipeline
   - Use separate tokens for automation

3. **Configure Access Control**
   - Invite team members
   - Set appropriate permissions

4. **Enable Advanced Features** (optional)
   - Cost estimation
   - Policy as code (Sentinel)
   - Private module registry

## Integration with iac/ Directory

The `tf-cloud` script integrates with your existing infrastructure code in the `iac/` directory:

### Directory Migration
When you run `make tf-cloud init`, the script will:
1. Automatically migrate `iac/envs/` to `iac/stages/` for consistency
2. Update the iac/Makefile to use stages instead of envs
3. Configure backend files in each stage directory

### Backend Configuration
Each stage in `iac/stages/` will have its `terraform.tf` updated with:
```hcl
terraform {
  cloud {
    organization = "your-project-org"

    workspaces {
      name = "your-project-production"
    }
  }
}
```

### Status Checking
Run `make tf-cloud status` to verify:
- Terraform Cloud organization exists
- Workspaces are created
- Backend configurations are in sync
- Each stage's terraform.tf points to the correct workspace

## Using the iac Script

The `bin/iac` script runs Terraform commands with 1Password vault secrets:

```bash
# Run terraform plan for production
./bin/iac production plan

# Apply changes to production
./bin/iac production apply

# Run any terraform command
./bin/iac <stage> <terraform-command> [args]

# The script will automatically:
# - Load secrets from 1Password vault
# - Navigate to the correct stage directory
# - Run terraform with proper authentication
```

## Example Project Structure

After running `make tf-cloud init`:

```
platform/
├── .env.project              # Project configuration
├── .env.vault               # Vault references (1Password)
├── bin/
│   ├── tf-cloud            # Terraform Cloud management script
│   ├── iac                 # Infrastructure deployment script
│   └── vault               # Vault integration
├── iac/
│   ├── stages/             # Stage-specific configurations (migrated from envs/)
│   │   ├── production/
│   │   │   ├── terraform.tf    # Backend config (auto-updated)
│   │   │   ├── main.tf         # Infrastructure definitions
│   │   │   └── variables.tf    # Stage variables
│   │   └── registry/
│   │       └── ...
│   ├── modules/            # Reusable Terraform modules
│   └── Makefile            # Infrastructure make targets
└── Makefile                # Main project makefile
```

## Related Documentation

- [Terraform Cloud Documentation](https://developer.hashicorp.com/terraform/cloud-docs)
- [Terraform CLI Documentation](https://developer.hashicorp.com/terraform/cli)
- [1Password CLI](https://developer.1password.com/docs/cli)