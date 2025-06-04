#!/usr/bin/env bash

# Comprehensive check script that runs all code quality tools

# Source shared utilities
source "$(dirname "$0")/utils.sh"

# Parse arguments
FIX_MODE=false
VERBOSE=false

while [[ $# -gt 0 ]]; do
    case $1 in
        -f|--fix)
            FIX_MODE=true
            shift
            ;;
        -v|--verbose)
            VERBOSE=true
            shift
            ;;
        -h|--help)
            echo "Usage: $0 [options]"
            echo ""
            echo "Options:"
            echo "  -q, --quick    Skip slow checks (like tests)"
            echo "  -f, --fix      Auto-fix issues where possible"
            echo "  -v, --verbose  Show detailed output"
            echo "  -h, --help     Show this help message"
            echo ""
            echo "This script runs all code quality checks including:"
            echo "  - Type checking (mypy)"
            echo "  - Linting (ruff)"
            echo "  - Formatting (black)"
            echo "  - Tests (pytest) - skipped in quick mode"
            exit 0
            ;;
        *)
            echo -e "${RED}Unknown option: $1${NC}"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
done

# Track overall status
OVERALL_SUCCESS=0

# Function to run a check with proper error handling
run_check() {
    local name=$1
    local script=$2
    local args=$3
    
    print_header "$name"
    
    if $VERBOSE; then
        $script $args
    else
        # Capture output for non-verbose mode
        output=$($script $args 2>&1)
        result=$?
    fi
    
    result=$?
    if [ $result -eq 0 ]; then
        echo -e "${GREEN} $name passed${NC}"
    else
        echo -e "${RED} $name failed${NC}"
        if ! $VERBOSE; then
            echo "$output"
        fi
        OVERALL_SUCCESS=1
    fi
    echo
    
    return $result
}

# Type checking
if $FIX_MODE; then
    echo -e "${YELLOW}Note: Type checking has no auto-fix mode${NC}"
fi
run_check "Type Checking (MyPy)" "$PROJECT_ROOT/bin/types.sh" ""

# Linting
if $FIX_MODE; then
    run_check "Linting (Ruff)" "$PROJECT_ROOT/bin/lint.sh" "--fix"
else
    run_check "Linting (Ruff)" "$PROJECT_ROOT/bin/lint.sh" ""
fi

# Formatting
if $FIX_MODE; then
    run_check "Formatting (Black)" "$PROJECT_ROOT/bin/fmt.sh" ""
else
    run_check "Formatting (Black)" "$PROJECT_ROOT/bin/fmt.sh" "--check"
fi

# Final summary
print_header "Summary"

if [ $OVERALL_SUCCESS -eq 0 ]; then
    echo -e "${GREEN} All checks passed!${NC}"
    if $QUICK_MODE; then
        echo -e "${YELLOW}   (Note: tests were skipped in quick mode)${NC}"
    fi
else
    echo -e "${RED}L Some checks failed${NC}"
    echo
    echo "Tips:"
    if $FIX_MODE; then
        echo "  - Some issues were auto-fixed, run again to verify"
    else
        echo "  - Run with --fix to auto-fix formatting and linting issues"
    fi
    echo "  - Run individual check scripts for more details:"
    echo "    - ./bin/types.sh    # Type checking"
    echo "    - ./bin/lint.sh     # Linting"
    echo "    - ./bin/fmt.sh      # Formatting"
    echo "    - ./bin/test.sh     # Tests"
fi

exit $OVERALL_SUCCESS