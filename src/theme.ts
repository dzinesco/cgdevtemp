/**
 * Theme configuration for the CrispyGoat template
 * This file will be customized based on Coolors.co palette during setup
 */

export const theme = {
  primary: '#3B82F6',
  secondary: '#10B981', 
  accent: '#F59E0B',
  background: '#F8FAFC',
  text: '#1F2937'
};

/**
 * Generate Tailwind CSS color variants from hex color
 * @param hexColor - Hex color code (e.g., '#3B82F6')
 * @returns Object with color variants (50-950)
 */
export function generateColorVariants(hexColor: string) {
  // This is a simplified version - in production you'd use a color manipulation library
  return {
    50: lighten(hexColor, 0.9),
    100: lighten(hexColor, 0.8),
    200: lighten(hexColor, 0.6),
    300: lighten(hexColor, 0.4),
    400: lighten(hexColor, 0.2),
    500: hexColor,
    600: darken(hexColor, 0.1),
    700: darken(hexColor, 0.2),
    800: darken(hexColor, 0.3),
    900: darken(hexColor, 0.4),
    950: darken(hexColor, 0.5)
  };
}

/**
 * Lighten a hex color
 * @param color - Hex color code
 * @param amount - Amount to lighten (0-1)
 * @returns Lightened hex color
 */
function lighten(color: string, amount: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(255 * amount);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

/**
 * Darken a hex color
 * @param color - Hex color code
 * @param amount - Amount to darken (0-1)
 * @returns Darkened hex color
 */
function darken(color: string, amount: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(255 * amount);
  const R = (num >> 16) - amt;
  const G = (num >> 8 & 0x00FF) - amt;
  const B = (num & 0x0000FF) - amt;
  return '#' + (0x1000000 + (R > 255 ? 255 : R < 0 ? 0 : R) * 0x10000 +
    (G > 255 ? 255 : G < 0 ? 0 : G) * 0x100 +
    (B > 255 ? 255 : B < 0 ? 0 : B)).toString(16).slice(1);
}

export type Theme = typeof theme;