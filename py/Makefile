.PHONY: help
help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@echo '  dev: Run development server'
	@echo '  install: Install dependencies'
	@echo '  build: Build the project'
	@echo '  test: Run tests'
	@echo '  lint: Run linter (ruff)'
	@echo '  fmt: Format code (black)'
	@echo '  fmt-check: Check code formatting'
	@echo '  types: Check types (mypy/pyright)'
	@echo '  check: Run all checks'
	@echo '  docker-build: Build Docker image'
	@echo '  clean: Clean build artifacts'
	@echo '  tailwind: Build Tailwind CSS'
	@echo '  tailwind-watch: Watch Tailwind CSS'

.PHONY: dev
dev: ## Run development server
	@./bin/dev.sh

.PHONY: install
install: ## Install dependencies
	@uv sync

.PHONY: build
build: ## Build the project
	echo "no build for py"

.PHONY: test
test: ## Run tests
	@./bin/test.sh

.PHONY: lint
lint: ## Run linter (ruff)
	@./bin/lint.sh

.PHONY: fmt
fmt: ## Format code (black)
	@./bin/fmt.sh

.PHONY: fmt-check
fmt-check: ## Check code formatting
	@./bin/fmt.sh --check

.PHONY: types
types: ## Check types (mypy/pyright)
	@./bin/types.sh

.PHONY: check
check: fmt-check lint types test ## Run all checks

# TODO (config): target with configurable image name
.PHONY: docker-build
docker-build: ## Build Docker image
	@docker build -t py-app .

.PHONY: clean
clean: ## Clean build artifacts
	@echo "Cleaning Python build artifacts..."
	@find . -type d -name "__pycache__" -exec rm -rf {} +
	@find . -type d -name ".pytest_cache" -exec rm -rf {} +
	@find . -type d -name ".mypy_cache" -exec rm -rf {} +
	@find . -type d -name ".ruff_cache" -exec rm -rf {} +
	@find . -type d -name "htmlcov" -exec rm -rf {} +
	@find . -type d -name ".coverage" -exec rm -rf {} +
	@find . -type f -name "*.pyc" -delete
	@find . -type f -name ".coverage" -delete
	@find . -type f -name ".venv" -delete

.PHONY: tailwind
tailwind: ## Build Tailwind CSS
	@./bin/tailwind.sh

.PHONY: tailwind-watch
tailwind-watch: ## Watch Tailwind CSS
	@./bin/tailwind.sh -w