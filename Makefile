.PHONY: help
help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*##"; printf "\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  %-20s %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

.PHONY: all
all: fmt lint test build ## Run format, lint, test, and build

.PHONY: dev
dev: ## Run all development servers concurrently
	@echo "Starting all development servers..."
	@$(MAKE) -j2 dev-ts dev-py

.PHONY: dev-ts
dev-ts: ## Run TypeScript development server
	@echo "Starting TypeScript dev server..."
	@cd ts && pnpm dev

.PHONY: dev-py
dev-py: ## Run Python development server
	@echo "Starting Python dev server..."
	@cd py && ./bin/dev.sh

.PHONY: dev-py-db
dev-py-db: ## Run Python dev server with database
	@echo "Starting Python dev server with database..."
	@cd py && ./bin/dev.sh --db

.PHONY: test
test: test-ts test-py ## Run all tests

.PHONY: test-ts
test-ts: ## Run TypeScript tests
	@echo "Running TypeScript tests..."
	@cd ts && pnpm test

.PHONY: test-py
test-py: ## Run Python tests
	@echo "Running Python tests..."
	@cd py && ./bin/test.sh

.PHONY: lint
lint: lint-ts lint-py ## Run all linters

.PHONY: lint-ts
lint-ts: ## Run TypeScript linter
	@echo "Linting TypeScript..."
	@cd ts && pnpm lint

.PHONY: lint-py
lint-py: ## Run Python linter
	@echo "Linting Python..."
	@cd py && ./bin/lint.sh

.PHONY: fmt
fmt: fmt-ts fmt-py ## Format all code

.PHONY: fmt-ts
fmt-ts: ## Format TypeScript code
	@echo "Formatting TypeScript..."
	@cd ts && pnpm fmt

.PHONY: fmt-py
fmt-py: ## Format Python code
	@echo "Formatting Python..."
	@cd py && ./bin/fmt.sh

.PHONY: fmt-check
fmt-check: fmt-check-ts fmt-check-py ## Check formatting

.PHONY: fmt-check-ts
fmt-check-ts: ## Check TypeScript formatting
	@echo "Checking TypeScript formatting..."
	@cd ts && pnpm fmt:check

.PHONY: fmt-check-py
fmt-check-py: ## Check Python formatting
	@echo "Checking Python formatting..."
	@cd py && ./bin/fmt.sh --check

.PHONY: types
types: types-ts types-py ## Run type checking

.PHONY: types-ts
types-ts: ## Check TypeScript types
	@echo "Checking TypeScript types..."
	@cd ts && pnpm check-types

.PHONY: types-py
types-py: ## Check Python types
	@echo "Checking Python types..."
	@cd py && ./bin/types.sh

.PHONY: build
build: build-ts ## Build all projects

.PHONY: build-ts
build-ts: ## Build TypeScript projects
	@echo "Building TypeScript projects..."
	@cd ts && pnpm build

.PHONY: docker-build
docker-build: docker-build-ts docker-build-py ## Build all Docker images

.PHONY: docker-build-ts
docker-build-ts: ## Build TypeScript Docker images
	@echo "Building TypeScript Docker images..."
	@cd ts && ./bin/docker build api
	@cd ts && ./bin/docker build web

.PHONY: docker-build-py
docker-build-py: ## Build Python Docker image
	@echo "Building Python Docker image..."
	@cd py && docker build -t py-app .

.PHONY: db-start
db-start: ## Start PostgreSQL database
	@echo "Starting PostgreSQL database..."
	@cd py && ./bin/postgres.sh

.PHONY: db-migrate
db-migrate: ## Run database migrations
	@echo "Running database migrations..."
	@cd py && ./bin/migrate.sh

.PHONY: db-upgrade
db-upgrade: ## Upgrade database to latest migration
	@echo "Upgrading database..."
	@cd py && alembic upgrade head

.PHONY: db-downgrade
db-downgrade: ## Downgrade database by one migration
	@echo "Downgrading database..."
	@cd py && alembic downgrade -1

.PHONY: install
install: install-ts install-py ## Install all dependencies

.PHONY: install-ts
install-ts: ## Install TypeScript dependencies
	@echo "Installing TypeScript dependencies..."
	@cd ts && pnpm install

.PHONY: install-py
install-py: ## Install Python dependencies
	@echo "Installing Python dependencies..."
	@cd py && uv sync

.PHONY: clean
clean: clean-ts clean-py ## Clean all build artifacts

.PHONY: clean-ts
clean-ts: ## Clean TypeScript build artifacts
	@echo "Cleaning TypeScript artifacts..."
	@cd ts && find . -name "node_modules" -type d -prune -exec rm -rf {} +
	@cd ts && find . -name "dist" -type d -prune -exec rm -rf {} +
	@cd ts && find . -name ".turbo" -type d -prune -exec rm -rf {} +

.PHONY: clean-py
clean-py: ## Clean Python build artifacts
	@echo "Cleaning Python artifacts..."
	@cd py && find . -type d -name "__pycache__" -exec rm -rf {} +
	@cd py && find . -type d -name ".pytest_cache" -exec rm -rf {} +
	@cd py && find . -type d -name ".mypy_cache" -exec rm -rf {} +
	@cd py && find . -type d -name ".ruff_cache" -exec rm -rf {} +
	@cd py && find . -type f -name "*.pyc" -delete

.PHONY: tf-init
tf-init: ## Initialize Terraform
	@$(MAKE) -C iac init

.PHONY: tf-plan
tf-plan: ## Plan Terraform changes
	@$(MAKE) -C iac plan

.PHONY: tf-apply
tf-apply: ## Apply Terraform changes
	@$(MAKE) -C iac apply

.PHONY: check
check: fmt-check types test ## Run all checks (format, lint, types, test)