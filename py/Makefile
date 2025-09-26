.PHONY: help
help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*##"; printf "\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  %-20s %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

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
tailwind: ## Build Tailwind CSS (deprecated - use 'make styles')
	@./bin/tailwind.sh

.PHONY: tailwind-watch
tailwind-watch: ## Watch Tailwind CSS (deprecated - use 'make styles-watch')
	@./bin/tailwind.sh -w

.PHONY: styles
styles: ## Build styles with Tailwind CSS and copy assets
	@echo "Building Python styles..."
	@# Copy branding assets
	@mkdir -p static
	@cp ../branding/assets/favicon.ico static/favicon.ico
	@cp ../branding/assets/favicon.png static/favicon.png
	@cp ../branding/assets/icon.png static/icon.png
	@cp ../branding/assets/icon.svg static/icon.svg
	@npx tailwindcss -i ./styles/main.css -o ./static/css/main.css --minify
	@echo "✓ Styles built"
	@echo "✓ Assets copied"

.PHONY: styles-watch
styles-watch: ## Watch and rebuild styles on changes
	@echo "Watching Python styles..."
	@npx tailwindcss -i ./styles/main.css -o ./static/css/main.css --watch