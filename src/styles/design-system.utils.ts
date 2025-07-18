/**
 * Sabha Design System - Utility Functions
 * Helper functions for using the design system in TypeScript/React
 */

import { SabhaDesignSystem } from './design-system.types';

/**
 * Helper function to get a CSS variable value
 * @param variable - The CSS variable name
 * @returns The CSS variable reference
 */
export function sabhaVar(variable: keyof SabhaDesignSystem): string {
  return `var(${variable})`;
}

/**
 * Helper function to get multiple CSS variables as an object
 * @param variables - Array of CSS variable names
 * @returns Object with CSS variable references
 */
export function sabhaVars<T extends keyof SabhaDesignSystem>(
  variables: T[]
): Record<T, string> {
  return variables.reduce((acc, variable) => {
    acc[variable] = `var(${variable})`;
    return acc;
  }, {} as Record<T, string>);
}

/**
 * Common component style objects using design system variables
 */
export const sabhaComponents = {
  button: {
    primary: {
      backgroundColor: sabhaVar('--sabha-primary-600'),
      color: sabhaVar('--sabha-text-inverse'),
      padding: `${sabhaVar('--sabha-spacing-sm')} ${sabhaVar('--sabha-spacing-lg')}`,
      borderRadius: sabhaVar('--sabha-radius-lg'),
      border: 'none',
      fontWeight: '500',
      transition: sabhaVar('--sabha-transition-fast'),
      cursor: 'pointer',
    },
    secondary: {
      backgroundColor: sabhaVar('--sabha-bg-primary'),
      color: sabhaVar('--sabha-text-primary'),
      padding: `${sabhaVar('--sabha-spacing-sm')} ${sabhaVar('--sabha-spacing-lg')}`,
      borderRadius: sabhaVar('--sabha-radius-lg'),
      border: `1px solid ${sabhaVar('--sabha-border-primary')}`,
      fontWeight: '500',
      transition: sabhaVar('--sabha-transition-fast'),
      cursor: 'pointer',
    },
  },
  card: {
    backgroundColor: sabhaVar('--sabha-bg-primary'),
    borderRadius: sabhaVar('--sabha-radius-lg'),
    boxShadow: sabhaVar('--sabha-shadow-sm'),
    border: `1px solid ${sabhaVar('--sabha-border-primary')}`,
    padding: sabhaVar('--sabha-spacing-xl'),
  },
  input: {
    padding: `${sabhaVar('--sabha-spacing-sm')} ${sabhaVar('--sabha-spacing-md')}`,
    borderRadius: sabhaVar('--sabha-radius-md'),
    border: `1px solid ${sabhaVar('--sabha-border-primary')}`,
    backgroundColor: sabhaVar('--sabha-bg-primary'),
    color: sabhaVar('--sabha-text-primary'),
    fontSize: '1rem',
    transition: sabhaVar('--sabha-transition-fast'),
  },
} as const;

/**
 * Responsive breakpoints (matches common CSS frameworks)
 */
export const sabhaBreakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

/**
 * Helper function to create media queries with design system breakpoints
 * @param breakpoint - The breakpoint name
 * @param styles - The styles to apply at that breakpoint
 * @returns Media query string
 */
export function sabhaMediaQuery(
  breakpoint: keyof typeof sabhaBreakpoints,
  styles: string
): string {
  return `@media (min-width: ${sabhaBreakpoints[breakpoint]}) { ${styles} }`;
}

/**
 * Color palette helpers
 */
export const sabhaColors = {
  primary: {
    50: sabhaVar('--sabha-primary-50'),
    100: sabhaVar('--sabha-primary-100'),
    500: sabhaVar('--sabha-primary-500'),
    600: sabhaVar('--sabha-primary-600'),
    700: sabhaVar('--sabha-primary-700'),
    800: sabhaVar('--sabha-primary-800'),
  },
  text: {
    primary: sabhaVar('--sabha-text-primary'),
    secondary: sabhaVar('--sabha-text-secondary'),
    tertiary: sabhaVar('--sabha-text-tertiary'),
    muted: sabhaVar('--sabha-text-muted'),
    inverse: sabhaVar('--sabha-text-inverse'),
  },
  bg: {
    primary: sabhaVar('--sabha-bg-primary'),
    secondary: sabhaVar('--sabha-bg-secondary'),
    tertiary: sabhaVar('--sabha-bg-tertiary'),
    gradient: sabhaVar('--sabha-bg-gradient'),
  },
  border: {
    primary: sabhaVar('--sabha-border-primary'),
    secondary: sabhaVar('--sabha-border-secondary'),
    focus: sabhaVar('--sabha-border-focus'),
  },
  google: {
    blue: sabhaVar('--sabha-google-blue'),
    green: sabhaVar('--sabha-google-green'),
    yellow: sabhaVar('--sabha-google-yellow'),
    red: sabhaVar('--sabha-google-red'),
  },
} as const;

/**
 * Spacing helpers
 */
export const sabhaSpacing = {
  xs: sabhaVar('--sabha-spacing-xs'),
  sm: sabhaVar('--sabha-spacing-sm'),
  md: sabhaVar('--sabha-spacing-md'),
  lg: sabhaVar('--sabha-spacing-lg'),
  xl: sabhaVar('--sabha-spacing-xl'),
  '2xl': sabhaVar('--sabha-spacing-2xl'),
} as const;

/**
 * Border radius helpers
 */
export const sabhaRadius = {
  sm: sabhaVar('--sabha-radius-sm'),
  md: sabhaVar('--sabha-radius-md'),
  lg: sabhaVar('--sabha-radius-lg'),
  xl: sabhaVar('--sabha-radius-xl'),
  '2xl': sabhaVar('--sabha-radius-2xl'),
} as const;

/**
 * Shadow helpers
 */
export const sabhaShadow = {
  sm: sabhaVar('--sabha-shadow-sm'),
  md: sabhaVar('--sabha-shadow-md'),
  lg: sabhaVar('--sabha-shadow-lg'),
} as const;

/**
 * Transition helpers
 */
export const sabhaTransition = {
  fast: sabhaVar('--sabha-transition-fast'),
  normal: sabhaVar('--sabha-transition-normal'),
  slow: sabhaVar('--sabha-transition-slow'),
} as const;
