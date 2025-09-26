#!/usr/bin/env bash

# Shared utilities for bin scripts

# Colors for output
export RED='\033[0;31m'
export GREEN='\033[0;32m'
export YELLOW='\033[1;33m'
export NC='\033[0m' # No Color

# Error counter
export ERRORS=0

# Get the script directory (where this utils.sh is located)
export SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Get the project root (parent of bin directory)
export PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Function to source project configuration
source_project_config() {
    if [ -f "$PROJECT_ROOT/.env.project" ]; then
        source "$PROJECT_ROOT/.env.project"
    else
        echo -e "${RED}Error: .env.project not found. Please create it with PROJECT_NAME and DEFAULT_STAGE.${NC}"
        return 1
    fi
}

# Function to print section headers
print_header() {
    echo -e "\n${YELLOW}=== $1 ===${NC}"
}

# Function to check command result
check_result() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ $1 passed${NC}"
    else
        echo -e "${RED}✗ $1 failed${NC}"
        ERRORS=$((ERRORS + 1))
    fi
}

# Function to print final summary
print_summary() {
    local success_msg="$1"
    local failure_msg="${2:-check(s) failed}"

    print_header "Summary"
    if [ $ERRORS -eq 0 ]; then
        echo -e "${GREEN}${success_msg}${NC}"
        return 0
    else
        echo -e "${RED}${ERRORS} ${failure_msg}${NC}"
        return 1
    fi
}

# Export functions for use in other scripts
export -f source_project_config
export -f print_header
export -f check_result
export -f print_summary