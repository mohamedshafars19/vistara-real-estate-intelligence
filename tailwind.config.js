/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        vistara: {
          bg: 'var(--v-bg)',
          surface: 'var(--v-surface)',
          elevated: 'var(--v-elevated)',
          primary: 'var(--v-primary)',
          secondary: 'var(--v-secondary)',
          accent: 'var(--v-accent)',
          accentHover: 'var(--v-accent-hover)',
          softAccent: 'var(--v-soft-accent)',
          border: 'var(--v-border)',
          muted: 'var(--v-muted)',
          highlight: 'var(--v-highlight)',
        },
        navy: {
          900: '#142334',
          800: '#1D2E40',
          700: '#2A3F55',
        },
        champagne: {
          50: '#F9F6EE',
          100: '#F1E8E2',
          200: '#C9AD98',
          300: '#B9967F',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(20, 35, 52, 0.05)',
        'card': '0 2px 8px -2px rgba(20, 35, 52, 0.06), 0 1px 4px -1px rgba(20, 35, 52, 0.04)',
        'elevated': '0 8px 24px -4px rgba(20, 35, 52, 0.08), 0 2px 6px -1px rgba(20, 35, 52, 0.04)',
        'popover': '0 12px 36px -6px rgba(20, 35, 52, 0.12), 0 4px 12px -2px rgba(20, 35, 52, 0.06)',
      },
      maxWidth: {
        'vistara': '1440px',
      }
    },
  },
  plugins: [],
}
