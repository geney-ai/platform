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

.PHONY: lint
lint: ## Run linter
	@echo "no lint for ts"

.PHONY: check
check: fmt-check types test ## Run all checks

.PHONY: docker-build
docker-build: ## Build Docker images
	@$(MAKE) -j2 docker-build-api docker-build-web

docker-build-%: ## Build Docker image for the given service
	@./bin/docker build $(@:docker-build-%=%)

.PHONY: clean
clean: ## Clean build artifacts and dependencies
	@pnpm clean