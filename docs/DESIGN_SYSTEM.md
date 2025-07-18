# Sabha Design System

## Overview
The Sabha Design System provides a centralized approach to colors, spacing, and other design tokens throughout the application. All colors and design values are managed through CSS custom properties (variables) to ensure consistency and maintainability.

## Color System

### Primary Colors
- `--sabha-primary-50` - Lightest primary shade (#eff6ff)
- `--sabha-primary-100` - Very light primary (#dbeafe)
- `--sabha-primary-500` - Medium primary (#3b82f6)
- `--sabha-primary-600` - Main brand color (#2563eb)
- `--sabha-primary-700` - Darker primary (#1d4ed8)
- `--sabha-primary-800` - Darkest primary (#1e40af)

### Secondary Colors
- `--sabha-secondary-50` to `--sabha-secondary-900` - Full grayscale palette

### Semantic Colors
- **Success**: `--sabha-success-50` to `--sabha-success-800`
- **Warning**: `--sabha-warning-50` to `--sabha-warning-700`
- **Error**: `--sabha-error-50` to `--sabha-error-700`
- **Accent**: `--sabha-accent-50` to `--sabha-accent-700`

### Background Colors
- `--sabha-bg-primary` - Main background (#ffffff)
- `--sabha-bg-secondary` - Secondary background (#f9fafb)
- `--sabha-bg-tertiary` - Tertiary background (#f3f4f6)
- `--sabha-bg-gradient` - Main gradient background

### Text Colors
- `--sabha-text-primary` - Primary text (#111827)
- `--sabha-text-secondary` - Secondary text (#374151)
- `--sabha-text-tertiary` - Tertiary text (#6b7280)
- `--sabha-text-muted` - Muted text (#9ca3af)
- `--sabha-text-inverse` - Inverse text (#ffffff)

### Border Colors
- `--sabha-border-primary` - Primary border (#e5e7eb)
- `--sabha-border-secondary` - Secondary border (#d1d5db)
- `--sabha-border-focus` - Focus border (#3b82f6)

### Google Brand Colors
- `--sabha-google-blue` - Google blue (#4285F4)
- `--sabha-google-green` - Google green (#34A853)
- `--sabha-google-yellow` - Google yellow (#FBBC05)
- `--sabha-google-red` - Google red (#EA4335)

### Dark Mode Colors
- `--sabha-dark-bg` - Dark background (#0a0a0a)
- `--sabha-dark-text` - Dark text (#ededed)

## Spacing System
- `--sabha-spacing-xs` - 0.25rem
- `--sabha-spacing-sm` - 0.5rem
- `--sabha-spacing-md` - 1rem
- `--sabha-spacing-lg` - 1.5rem
- `--sabha-spacing-xl` - 2rem
- `--sabha-spacing-2xl` - 3rem

## Border Radius
- `--sabha-radius-sm` - 0.25rem
- `--sabha-radius-md` - 0.375rem
- `--sabha-radius-lg` - 0.5rem
- `--sabha-radius-xl` - 0.75rem
- `--sabha-radius-2xl` - 1rem

## Shadows
- `--sabha-shadow-sm` - Small shadow
- `--sabha-shadow-md` - Medium shadow
- `--sabha-shadow-lg` - Large shadow

## Transitions
- `--sabha-transition-fast` - 150ms ease-in-out
- `--sabha-transition-normal` - 250ms ease-in-out
- `--sabha-transition-slow` - 350ms ease-in-out

## Usage Examples

### In CSS
```css
.button {
  background-color: var(--sabha-primary-600);
  color: var(--sabha-text-inverse);
  padding: var(--sabha-spacing-sm) var(--sabha-spacing-lg);
  border-radius: var(--sabha-radius-lg);
  transition: var(--sabha-transition-fast);
}

.button:hover {
  background-color: var(--sabha-primary-700);
}
```

### In React Components
```tsx
<div style={{
  backgroundColor: 'var(--sabha-bg-primary)',
  color: 'var(--sabha-text-primary)',
  padding: 'var(--sabha-spacing-lg)',
  borderRadius: 'var(--sabha-radius-lg)',
  boxShadow: 'var(--sabha-shadow-sm)',
}}>
  Content
</div>
```

## VS Code Integration

The design system is fully integrated with VS Code for enhanced developer experience:

1. **Autocomplete**: CSS variable names are autocompleted when typing
2. **Documentation**: Hover over variables to see their descriptions and hex values
3. **Syntax Highlighting**: Custom colors for CSS variables in the editor

### Files for VS Code Integration:
- `.vscode/settings.json` - VS Code configuration
- `.vscode/css-custom-data.json` - Custom CSS variable definitions
- `src/styles/design-system.types.ts` - TypeScript types for design system

## Best Practices

1. **Always use design system variables** instead of hardcoded colors
2. **Use semantic color names** (e.g., `--sabha-text-primary` instead of `--sabha-neutral-900`)
3. **Maintain consistency** across all components
4. **Test dark mode** compatibility when adding new colors
5. **Document any new variables** in both CSS and TypeScript files

## Files Structure
```
src/
├── styles/
│   ├── design-system.css      # Main color definitions
│   └── design-system.types.ts # TypeScript types
├── app/
│   └── globals.css           # Global styles importing design system
.vscode/
├── settings.json             # VS Code configuration
└── css-custom-data.json      # CSS variable definitions for autocomplete
```

## Contributing

When adding new colors or design tokens:

1. Add the variable to `src/styles/design-system.css`
2. Add the TypeScript type to `src/styles/design-system.types.ts`
3. Add the VS Code definition to `.vscode/css-custom-data.json`
4. Update this documentation
5. Use the new variable throughout the codebase

This ensures consistency and maintains the centralized approach to design tokens.
