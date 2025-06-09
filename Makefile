ARGS ?=

.PHONY: help
help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@echo '  check: Check all projects'
	@echo '  check-%: Check the given project'
	@echo '  install-%: Install dependencies for the given project'
	@echo '  build-%: Build the given project'
	@echo '  test-%: Run tests for the given project'
	@echo '  lint-%: Run linters for the given project'
	@echo '  fmt-%: Format the given project'
	@echo '  fmt-check-%: Check formatting for the given project'
	@echo '  types-%: Run type checking for the given project'
	@echo '  docker-build-%: Build the given project'
	@echo '  clean-%: Clean the given project'

# run a make command in the given directory
run-for:
	@if [ -d "./$(PROJECT)" ]; then \
		if [ -f "./$(PROJECT)/Makefile" ]; then \
			cd ./$(PROJECT) && make $(CMD); \
		else \
			echo "Error: Makefile not found in ./$(PROJECT) directory"; \
			exit 1; \
		fi; \
	else \
		echo "Error: Directory ./$(PROJECT) does not exist"; \
		exit 1; \
	fi

.PHONY: check
check: check-py check-ts

.PHONY: check-%
check-%: ## Check the given project
	@$(MAKE) run-for PROJECT=$(@:check-%=%) CMD=check


.PHONY: install-%
install-%: ## Install dependencies for the given project
	@$(MAKE) run-for PROJECT=$(@:install-%=%) CMD=install

.PHONY: dev-%
dev-%: ## Run development server for the given project
	@$(MAKE) run-for PROJECT=$(@:dev-%=%) CMD=dev

.PHONY: build-%
build-%: ## Build the given project
	@$(MAKE) run-for PROJECT=$(@:build-%=%) CMD=build

.PHONY: test-%
test-%: ## Run tests for the given project
	@$(MAKE) run-for PROJECT=$(@:test-%=%) CMD=test

.PHONY: lint-%
lint-%: ## Run linters for the given project
	@$(MAKE) run-for PROJECT=$(@:lint-%=%) CMD=lint

.PHONY: fmt-%
fmt-%: ## Format the given project
	@$(MAKE) run-for PROJECT=$(@:fmt-%=%) CMD=fmt

.PHONY: fmt-check-%
fmt-check-%: ## Check formatting for the given project
	@$(MAKE) run-for PROJECT=$(@:fmt-check-%=%) CMD=fmt-check

.PHONY: types-%
types-%: ## Run type checking for the given project
	@$(MAKE) run-for PROJECT=$(@:types-%=%) CMD=types

.PHONY: docker-build-%
docker-build-%: ## Build the given project
	@$(MAKE) run-for PROJECT=$(@:docker-build-%=%) CMD=docker-build

.PHONY: clean-%
clean-%: ## Clean the given project
	@$(MAKE) run-for PROJECT=$(@:clean-%=%) CMD=clean