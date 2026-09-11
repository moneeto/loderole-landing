/**
 * Visual identity — edit this file to retheme the landing.
 * Colors and fonts are applied as CSS custom properties on :root.
 * Components read only the CSS variables, never these values directly.
 */
export const theme = {
  colors: {
    primary: '#5B21E6',
    primaryHover: '#4C1BD1',
    secondary: '#141414',
    accent: '#5B21E6',
    bg: '#F4F1EC',
    bgAlt: '#FFFFFF',
    bgInverse: '#0C0C0C',
    text: '#141414',
    textMuted: '#5E5A54',
    textInverse: '#F4F1EC',
    border: '#E4DFD6',
    whatsapp: '#25D366',
  },
  fonts: {
    heading: '"Instrument Serif", "Times New Roman", serif',
    body: '"Figtree", "Helvetica Neue", sans-serif',
    brand: '"Gloock", serif',
  },
};

const cssVarMap = {
  '--color-primary': theme.colors.primary,
  '--color-primary-hover': theme.colors.primaryHover,
  '--color-secondary': theme.colors.secondary,
  '--color-accent': theme.colors.accent,
  '--color-bg': theme.colors.bg,
  '--color-bg-alt': theme.colors.bgAlt,
  '--color-bg-inverse': theme.colors.bgInverse,
  '--color-text': theme.colors.text,
  '--color-text-muted': theme.colors.textMuted,
  '--color-text-inverse': theme.colors.textInverse,
  '--color-border': theme.colors.border,
  '--color-whatsapp': theme.colors.whatsapp,
  '--font-heading': theme.fonts.heading,
  '--font-body': theme.fonts.body,
  '--font-brand': theme.fonts.brand,
};

export function applyTheme() {
  const root = document.documentElement;
  Object.entries(cssVarMap).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}
