#!/usr/bin/env bash

# Linting script for the project using ruff

# Source shared utilities
source "$(dirname "$0")/utils.sh"

# Parse arguments
FIX_MODE=false
if [[ "$1" == "--fix" ]]; then
    FIX_MODE=true
fi

if $FIX_MODE; then
    print_header "Running Ruff with Auto-fix"
    
    echo "Fixing linting issues..."
    uvx ruff check "$PROJECT_ROOT/src" "$PROJECT_ROOT/tests" --fix
    check_result "Ruff auto-fix"
else
    print_header "Running Ruff Linter"
    
    echo "Checking for linting issues..."
    uvx ruff check "$PROJECT_ROOT/src" "$PROJECT_ROOT/tests"
    check_result "Ruff check"
fi

# Final summary
if $FIX_MODE; then
    print_summary "All fixes applied successfully!" "check(s) failed"
else
    print_summary "All linting checks passed!" "check(s) failed"
fi
exit $?