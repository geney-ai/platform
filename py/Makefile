.PHONY: help
help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*##"; printf "\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  %-20s %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

.PHONY: dev
dev: ## Run development server
	@./bin/dev.sh

.PHONY: dev-db
dev-db: ## Run development server with database
	@./bin/dev.sh --db

.PHONY: run
run: ## Run production server
	@./bin/run.sh

.PHONY: test
test: ## Run tests
	@./bin/test.sh

.PHONY: test-cov
test-cov: ## Run tests with coverage
	@pytest --cov=src --cov-report=html --cov-report=term

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

.PHONY: install
install: ## Install dependencies
	@uv sync

.PHONY: lock
lock: ## Update lock file
	@uv lock

.PHONY: db-start
db-start: ## Start PostgreSQL container
	@./bin/postgres.sh

.PHONY: db-stop
db-stop: ## Stop PostgreSQL container
	@docker stop postgres-dev || true
	@docker rm postgres-dev || true

.PHONY: db-shell
db-shell: ## Open PostgreSQL shell
	@docker exec -it postgres-dev psql -U postgres

.PHONY: migrate
migrate: ## Run database migrations
	@./bin/migrate.sh

.PHONY: migrate-upgrade
migrate-upgrade: ## Upgrade to latest migration
	@alembic upgrade head

.PHONY: migrate-downgrade
migrate-downgrade: ## Downgrade by one migration
	@alembic downgrade -1

.PHONY: migrate-history
migrate-history: ## Show migration history
	@alembic history

.PHONY: migrate-current
migrate-current: ## Show current migration
	@alembic current

.PHONY: migrate-create
migrate-create: ## Create new migration (use with MSG="description")
	@alembic revision --autogenerate -m "$(MSG)"

.PHONY: docker-build
docker-build: ## Build Docker image
	@docker build -t py-app .

.PHONY: docker-run
docker-run: ## Run Docker container
	@docker run -p 8000:8000 py-app

.PHONY: clean
clean: ## Clean build artifacts
	@find . -type d -name "__pycache__" -exec rm -rf {} +
	@find . -type d -name ".pytest_cache" -exec rm -rf {} +
	@find . -type d -name ".mypy_cache" -exec rm -rf {} +
	@find . -type d -name ".ruff_cache" -exec rm -rf {} +
	@find . -type d -name "htmlcov" -exec rm -rf {} +
	@find . -type d -name ".coverage" -exec rm -rf {} +
	@find . -type f -name "*.pyc" -delete
	@find . -type f -name ".coverage" -delete

.PHONY: shell
shell: ## Open Python shell with app context
	@uv run python

.PHONY: tailwind
tailwind: ## Build Tailwind CSS
	@npx tailwindcss -i ./styles/main.css -o ./static/css/main.css --watch