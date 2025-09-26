# TypeScript Projects

This directory contains TypeScript-based projects for Geney, managed with pnpm workspaces and Turbo.
Right now it is primarily focused on the marketing site.

## Structure

```
ts/
├── apps/
│   └── marketing-site/    # React + Vite marketing website
├── packages/              # Shared packages (future)
├── package.json           # Root package.json
├── pnpm-workspace.yaml    # pnpm workspace configuration
└── turbo.json            # Turbo configuration
```

## Prerequisites

- Node.js 20.x
- pnpm 9.15.9

## Quick Start

```bash
# Install dependencies
make install

# Start development servers
make dev

# Build all projects
make build
```

## Available Commands

All commands are available through the Makefile:

```bash
make help          # Show available commands
make install       # Install dependencies
make dev           # Run development servers (all apps)
make build         # Build all projects
make test          # Run all tests
make fmt           # Format code
make fmt-check     # Check code formatting
make types         # Check TypeScript types
make check         # Run all checks (format, types, tests)
make docker-build  # Build Docker images
make clean         # Clean build artifacts and dependencies
```

## Projects

### Marketing Site (`apps/marketing-site/`)

The main marketing website built with:
- React 18
- Vite
- TypeScript
- Tailwind CSS
- Shadcn UI components

#### Development

```bash
# From the ts/ directory
make dev

# The site will be available at http://localhost:5173
```

#### Building

```bash
# Build the marketing site
make build
```

## Monorepo Management

This project uses:
- **pnpm workspaces** for dependency management
- **Turbo** for build orchestration and caching. Read more about [Turbo](https://turborepo.org/docs).

## Code Quality

The project enforces code quality through:

- **TypeScript** - Type checking with `make types`
- **Prettier** - Code formatting with `make fmt`
- **Testing** - Run tests with `make test`

Before committing, run:

```bash
make check
```

This will run formatting checks, type checks, and tests.
