/**
 * Sabha Design System - TypeScript Types
 * This file provides TypeScript autocomplete and validation for our design system variables
 */

export interface SabhaDesignSystem {
  // Primary Colors
  '--sabha-primary-50': string;
  '--sabha-primary-100': string;
  '--sabha-primary-500': string;
  '--sabha-primary-600': string;
  '--sabha-primary-700': string;
  '--sabha-primary-800': string;

  // Secondary Colors
  '--sabha-secondary-50': string;
  '--sabha-secondary-100': string;
  '--sabha-secondary-200': string;
  '--sabha-secondary-300': string;
  '--sabha-secondary-400': string;
  '--sabha-secondary-500': string;
  '--sabha-secondary-600': string;
  '--sabha-secondary-700': string;
  '--sabha-secondary-800': string;
  '--sabha-secondary-900': string;

  // Success Colors
  '--sabha-success-50': string;
  '--sabha-success-100': string;
  '--sabha-success-500': string;
  '--sabha-success-600': string;
  '--sabha-success-700': string;
  '--sabha-success-800': string;

  // Warning Colors
  '--sabha-warning-50': string;
  '--sabha-warning-100': string;
  '--sabha-warning-500': string;
  '--sabha-warning-600': string;
  '--sabha-warning-700': string;

  // Error Colors
  '--sabha-error-50': string;
  '--sabha-error-100': string;
  '--sabha-error-500': string;
  '--sabha-error-600': string;
  '--sabha-error-700': string;

  // Accent Colors
  '--sabha-accent-50': string;
  '--sabha-accent-100': string;
  '--sabha-accent-500': string;
  '--sabha-accent-600': string;
  '--sabha-accent-700': string;

  // Neutral Colors
  '--sabha-neutral-50': string;
  '--sabha-neutral-100': string;
  '--sabha-neutral-200': string;
  '--sabha-neutral-300': string;
  '--sabha-neutral-400': string;
  '--sabha-neutral-500': string;
  '--sabha-neutral-600': string;
  '--sabha-neutral-700': string;
  '--sabha-neutral-800': string;
  '--sabha-neutral-900': string;

  // Background Colors
  '--sabha-bg-primary': string;
  '--sabha-bg-secondary': string;
  '--sabha-bg-tertiary': string;
  '--sabha-bg-gradient': string;

  // Text Colors
  '--sabha-text-primary': string;
  '--sabha-text-secondary': string;
  '--sabha-text-tertiary': string;
  '--sabha-text-muted': string;
  '--sabha-text-inverse': string;

  // Border Colors
  '--sabha-border-primary': string;
  '--sabha-border-secondary': string;
  '--sabha-border-focus': string;

  // Shadow Colors
  '--sabha-shadow-sm': string;
  '--sabha-shadow-md': string;
  '--sabha-shadow-lg': string;

  // Interactive States
  '--sabha-hover-overlay': string;
  '--sabha-active-overlay': string;
  '--sabha-focus-ring': string;

  // Spacing
  '--sabha-spacing-xs': string;
  '--sabha-spacing-sm': string;
  '--sabha-spacing-md': string;
  '--sabha-spacing-lg': string;
  '--sabha-spacing-xl': string;
  '--sabha-spacing-2xl': string;

  // Border Radius
  '--sabha-radius-sm': string;
  '--sabha-radius-md': string;
  '--sabha-radius-lg': string;
  '--sabha-radius-xl': string;
  '--sabha-radius-2xl': string;

  // Transitions
  '--sabha-transition-fast': string;
  '--sabha-transition-normal': string;
  '--sabha-transition-slow': string;

  // Google Brand Colors
  '--sabha-google-blue': string;
  '--sabha-google-green': string;
  '--sabha-google-yellow': string;
  '--sabha-google-red': string;

  // Dark Mode Colors
  '--sabha-dark-bg': string;
  '--sabha-dark-text': string;
}

// Utility type for CSS custom properties
export type CSSCustomProperty<T extends keyof SabhaDesignSystem> = `var(${T})`;

// Helper function to get CSS custom property with type safety
export function sabhaVar<T extends keyof SabhaDesignSystem>(
  property: T
): CSSCustomProperty<T> {
  return `var(${property})`;
}

// Common color combinations for consistent theming
export const sabhaTheme = {
  primary: {
    background: 'var(--sabha-primary-600)',
    text: 'var(--sabha-text-inverse)',
    hover: 'var(--sabha-primary-700)',
    border: 'var(--sabha-primary-600)',
  },
  secondary: {
    background: 'var(--sabha-bg-primary)',
    text: 'var(--sabha-text-secondary)',
    hover: 'var(--sabha-neutral-50)',
    border: 'var(--sabha-border-primary)',
  },
  success: {
    background: 'var(--sabha-success-600)',
    text: 'var(--sabha-text-inverse)',
    hover: 'var(--sabha-success-700)',
    border: 'var(--sabha-success-600)',
  },
  error: {
    background: 'var(--sabha-error-600)',
    text: 'var(--sabha-text-inverse)',
    hover: 'var(--sabha-error-700)',
    border: 'var(--sabha-error-600)',
  },
} as const;

// Type for button variants
export type ButtonVariant = keyof typeof sabhaTheme;

// Common component styles
export const sabhaStyles = {
  button: {
    base: {
      padding: 'var(--sabha-spacing-sm) var(--sabha-spacing-lg)',
      borderRadius: 'var(--sabha-radius-lg)',
      fontWeight: '500',
      transition: 'var(--sabha-transition-fast)',
      cursor: 'pointer',
      border: '1px solid transparent',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--sabha-spacing-sm)',
    },
    variants: sabhaTheme,
  },
  card: {
    base: {
      backgroundColor: 'var(--sabha-bg-primary)',
      borderRadius: 'var(--sabha-radius-lg)',
      boxShadow: 'var(--sabha-shadow-sm)',
      border: '1px solid var(--sabha-border-primary)',
      padding: 'var(--sabha-spacing-xl)',
    },
  },
  input: {
    base: {
      padding: 'var(--sabha-spacing-sm) var(--sabha-spacing-md)',
      borderRadius: 'var(--sabha-radius-md)',
      border: '1px solid var(--sabha-border-primary)',
      backgroundColor: 'var(--sabha-bg-primary)',
      color: 'var(--sabha-text-primary)',
      fontSize: '1rem',
      transition: 'var(--sabha-transition-fast)',
    },
  },
} as const;
