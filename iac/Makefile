.PHONY: help
help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*##"; printf "\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  %-20s %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

ENV ?= production

.PHONY: init
init: ## Initialize Terraform (use ENV=production|registry)
	@echo "Initializing Terraform for $(ENV) environment..."
	@cd envs/$(ENV) && terraform init

.PHONY: init-all
init-all: ## Initialize all Terraform environments
	@for env in production registry; do \
		echo "Initializing $$env environment..."; \
		cd envs/$$env && terraform init && cd ../..; \
	done

.PHONY: plan
plan: ## Plan Terraform changes (use ENV=production|registry)
	@echo "Planning Terraform changes for $(ENV) environment..."
	@cd envs/$(ENV) && terraform plan

.PHONY: apply
apply: ## Apply Terraform changes (use ENV=production|registry)
	@echo "Applying Terraform changes for $(ENV) environment..."
	@cd envs/$(ENV) && terraform apply

.PHONY: destroy
destroy: ## Destroy Terraform resources (use ENV=production|registry)
	@echo "WARNING: This will destroy all resources in $(ENV) environment!"
	@echo "Press Ctrl+C to cancel, or Enter to continue..."
	@read confirm
	@cd envs/$(ENV) && terraform destroy

.PHONY: fmt
fmt: ## Format Terraform files
	@echo "Formatting Terraform files..."
	@terraform fmt -recursive .

.PHONY: fmt-check
fmt-check: ## Check Terraform formatting
	@echo "Checking Terraform formatting..."
	@terraform fmt -recursive -check .

.PHONY: validate
validate: ## Validate Terraform configuration
	@echo "Validating Terraform configuration for $(ENV) environment..."
	@cd envs/$(ENV) && terraform validate

.PHONY: validate-all
validate-all: ## Validate all Terraform environments
	@for env in production registry; do \
		echo "Validating $$env environment..."; \
		cd envs/$$env && terraform validate && cd ../..; \
	done

.PHONY: output
output: ## Show Terraform outputs (use ENV=production|registry)
	@cd envs/$(ENV) && terraform output

.PHONY: refresh
refresh: ## Refresh Terraform state (use ENV=production|registry)
	@echo "Refreshing Terraform state for $(ENV) environment..."
	@cd envs/$(ENV) && terraform refresh

.PHONY: state-list
state-list: ## List Terraform state resources (use ENV=production|registry)
	@cd envs/$(ENV) && terraform state list

.PHONY: console
console: ## Open Terraform console (use ENV=production|registry)
	@cd envs/$(ENV) && terraform console

.PHONY: graph
graph: ## Generate Terraform dependency graph (use ENV=production|registry)
	@cd envs/$(ENV) && terraform graph | dot -Tpng > terraform-graph-$(ENV).png
	@echo "Graph saved to envs/$(ENV)/terraform-graph-$(ENV).png"

.PHONY: clean
clean: ## Clean Terraform files
	@echo "Cleaning Terraform files..."
	@find . -type f -name "*.tfplan" -delete
	@find . -type f -name "*.tfstate.backup" -delete
	@find . -type f -name "terraform-graph-*.png" -delete
	@find . -type d -name ".terraform" -prune -exec rm -rf {} +

.PHONY: docs
docs: ## Generate Terraform documentation
	@echo "Generating Terraform documentation..."
	@terraform-docs markdown table --output-file README.md --output-mode inject ./modules/aws
	@terraform-docs markdown table --output-file README.md --output-mode inject ./modules/digitalocean
	@for env in production registry; do \
		terraform-docs markdown table --output-file README.md --output-mode inject ./envs/$$env; \
	done

.PHONY: cost
cost: ## Estimate costs with Infracost (use ENV=production|registry)
	@infracost breakdown --path envs/$(ENV)

.PHONY: security
security: ## Run security scan with tfsec
	@tfsec .