# Krondor Platform Branding System

A unified design system and branding solution that shares visual identity across Python and TypeScript applications.

## Overview

This branding system provides:
- **Single source of truth** for design tokens (colors, typography, spacing)
- **Shared Tailwind CSS configuration** as presets
- **CSS variables** for runtime theming (light/dark mode)
- **Animation utilities** for consistent motion design
- **Automatic generation** of platform-specific configurations
- **Build integration** with Makefiles for seamless development

## Architecture

```
branding/
├── core/
│   └── tokens.json         # Design tokens (source of truth)
├── tailwind/
│   └── preset.js          # Shared Tailwind preset
├── styles/
│   ├── variables.css      # CSS custom properties
│   ├── animations.css     # Shared animations
│   └── utilities.css      # Utility classes
├── assets/                # Shared assets (icons, logos, fonts)
├── build/
│   └── generate-python.js # Python config generator
├── package.json           # npm package configuration
└── index.js              # Main entry point
```

## How It Works

### 1. Design Tokens (`core/tokens.json`)

Central repository of all design values:
- **Colors**: Base palette and semantic color mappings
- **Typography**: Font families and size scales
- **Spacing**: Consistent spacing units
- **Animations**: Duration and timing functions
- **Border Radius**: Corner radius values

### 2. Tailwind Preset (`tailwind/preset.js`)

Exports a Tailwind configuration preset that:
- Maps design tokens to Tailwind utilities
- Defines color variables using CSS custom properties
- Includes keyframe animations
- Provides base theme configuration

### 3. CSS Files

**`variables.css`**: Defines CSS custom properties for runtime theming
- Light mode (default): Black and white theme
- Dark mode: Inverted color scheme
- Semantic color mappings (primary, secondary, accent, etc.)

**`animations.css`**: Reusable animation keyframes and utilities
- Basic: fade-in, slide-up, spin, pulse
- Advanced: blob, float, drift, orbit
- Animation delay utilities

**`utilities.css`**: Common utility and component classes
- Text utilities (gradients, balance)
- Backdrop effects
- Pre-styled components (cards, buttons, inputs)

### 4. Build Scripts

**Python Generator** (`build/generate-python.js`):
- Generates `tailwind.config.js` using the shared preset
- Creates `main.css` that imports shared styles
- Copies animation utilities

## Installation & Setup

### Initial Setup

1. **Install dependencies in branding directory:**
```bash
cd branding
npm install
```

2. **Generate Python configuration:**
```bash
npm run generate:python
```

3. **For TypeScript projects:**
The Next.js app already imports the branding package directly.

### Integration with Makefiles

Add these targets to your root `Makefile`:

```makefile
# Branding targets
.PHONY: branding-setup branding-generate branding-watch

branding-setup:
	cd branding && npm install

branding-generate:
	cd branding && npm run generate:all

branding-watch:
	cd branding && npm run watch

# Python CSS build
py-css-build:
	cd py && npx tailwindcss -i ./styles/main.css -o ./static/css/main.css --minify

py-css-watch:
	cd py && npx tailwindcss -i ./styles/main.css -o ./static/css/main.css --watch

# Combined development targets
dev-branding: branding-watch
dev-py: py-css-watch
dev-ts: ts-dev
```

Add to Python's `Makefile`:
```makefile
css-build:
	npx tailwindcss -i ./styles/main.css -o ./static/css/main.css --minify

css-watch:
	npx tailwindcss -i ./styles/main.css -o ./static/css/main.css --watch

dev: css-watch
	# Your Python dev server command
```

Add to TypeScript's `Makefile`:
```makefile
# The Next.js app automatically rebuilds CSS during development
dev:
	pnpm dev
```

## Usage

### Python Application

The Python app uses generated configuration:

```javascript
// py/tailwind.config.js (auto-generated)
const brandingPreset = require('../branding/tailwind/preset.js');

module.exports = {
  content: ["./templates/**/*.html", "./src/**/*.py"],
  presets: [brandingPreset],
  theme: {
    extend: {
      // Python-specific extensions
    }
  }
}
```

```css
/* py/styles/main.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Imports shared branding styles */
@import '../../branding/styles/variables.css';
@import '../../branding/styles/animations.css';
@import '../../branding/styles/utilities.css';

/* Python-specific styles */
```

### TypeScript/Next.js Application

The TypeScript app imports the branding preset directly:

```typescript
// ts/apps/next/tailwind.config.ts
const brandingPreset = require('../../../branding/tailwind/preset.js');

const config: Config = {
  presets: [brandingPreset],
  theme: {
    extend: {
      // TypeScript-specific extensions
    }
  }
}
```

```css
/* ts/apps/next/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@import '../../../branding/styles/variables.css';
@import '../../../branding/styles/animations.css';
@import '../../../branding/styles/utilities.css';

/* TypeScript-specific styles */
```

## Extending the System

### Adding New Design Tokens

1. Edit `branding/core/tokens.json`:
```json
{
  "colors": {
    "brand": {
      "primary": "#000000",
      "secondary": "#666666"
    }
  }
}
```

2. Update the Tailwind preset in `branding/tailwind/preset.js`

3. Regenerate configurations:
```bash
cd branding && npm run generate:all
```

### Adding Project-Specific Styles

Each project can extend the base theme:

```javascript
// Python example
module.exports = {
  presets: [brandingPreset],
  theme: {
    extend: {
      colors: {
        'py-special': '#123456'  // Python-only color
      }
    }
  }
}
```

```typescript
// TypeScript example
const config: Config = {
  presets: [brandingPreset],
  theme: {
    extend: {
      animation: {
        'ts-fancy': 'fancy 2s ease-in-out'  // TS-only animation
      }
    }
  }
}
```

### Switching Themes

The system uses CSS variables for theming. To switch themes:

```html
<!-- Light mode (default) -->
<html>

<!-- Dark mode -->
<html class="dark">
```

In JavaScript/TypeScript:
```javascript
// Toggle dark mode
document.documentElement.classList.toggle('dark');
```

## Maintenance

### Updating Shared Styles

1. Make changes in `branding/` directory
2. Run generators: `npm run generate:all`
3. Rebuild CSS in each project:
   - Python: `make py-css-build`
   - TypeScript: Automatic with Next.js

### Version Control

- Commit all files in `branding/` directory
- Generated files in Python (`py/tailwind.config.js`) are committed
- CSS builds (`py/static/css/main.css`) can be gitignored if built in CI/CD

### Development Workflow

1. **Watch Mode**: Run `make branding-watch` to auto-regenerate on changes
2. **CSS Watch**: Run `make py-css-watch` for Python CSS hot-reload
3. **TypeScript**: Next.js handles hot-reload automatically

## Benefits

1. **Consistency**: Same visual language across all platforms
2. **Maintainability**: Single source of truth for design decisions
3. **Scalability**: Easy to add new projects or platforms
4. **Flexibility**: Each project can extend base theme
5. **Performance**: Shared utilities reduce CSS duplication
6. **Developer Experience**: Automatic generation and hot-reload

## Troubleshooting

### CSS not updating in Python app
```bash
# Rebuild CSS
cd py && npx tailwindcss -i ./styles/main.css -o ./static/css/main.css

# Clear browser cache and reload
```

### TypeScript not finding branding preset
```bash
# Ensure relative path is correct in tailwind.config.ts
const brandingPreset = require('../../../branding/tailwind/preset.js');
```

### Dark mode not working
- Ensure `darkMode: 'class'` is in Tailwind config
- Add `class="dark"` to HTML element
- Check CSS variables are properly imported

## Future Enhancements

- [ ] Add color palette generator for brand variations
- [ ] Create Figma token sync
- [ ] Add component library with React/Vue implementations
- [ ] Build visual regression testing
- [ ] Add accessibility color contrast checker
- [ ] Create brand guidelines documentation site