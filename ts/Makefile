.PHONY: help
help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*##"; printf "\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  %-20s %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

.PHONY: install
install: ## Install dependencies
	@pnpm install

.PHONY: dev
dev: ## Run development servers (all apps)
	@pnpm dev

.PHONY: build
build: ## Build all projects
	@pnpm build

.PHONY: test
test: ## Run all tests
	@pnpm test

.PHONY: fmt
fmt: ## Format code
	@pnpm fmt

.PHONY: fmt-check
fmt-check: ## Check code formatting
	@pnpm fmt:check

.PHONY: types
types: ## Check TypeScript types
	@pnpm check-types

.PHONY: check
check: fmt-check types test ## Run all checks

.PHONY: clean
clean: ## Clean build artifacts and dependencies
	@pnpm clean