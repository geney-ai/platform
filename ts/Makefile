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
	@bash -c "source ../bin/vault && run_with_vault -- pnpm dev"

.PHONY: build
build: ## Build all projects
	@bash -c "source ../bin/vault && run_with_vault -- pnpm build"

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

.PHONY: lint
lint: ## Run linter
	@echo "no lint for ts"

.PHONY: check
check: fmt-check types test ## Run all checks

.PHONY: clean
clean: ## Clean build artifacts and dependencies
	@pnpm clean

.PHONY: styles
styles: ## Build styles (handled automatically by Next.js)
	@echo "TypeScript/Next.js handles styles automatically during build"
	@echo "Run 'make build' to build the entire project including styles"

.PHONY: styles-watch
styles-watch: ## Watch styles (handled automatically by Next.js dev server)
	@echo "TypeScript/Next.js handles styles automatically during development"
	@echo "Run 'make dev' to start the dev server with hot-reload"
