/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f5ff',
          100: '#e0ebff',
          200: '#bae0ff',
          300: '#7cc2ff',
          400: '#369eff',
          500: '#0979f6',
          600: '#005bd4',
          700: '#0047ac',
          800: '#043b8b',
          900: '#0a336f',
          950: '#071f48',
        },
        enterprise: {
          bg: '#f8fafc',
          panel: '#ffffff',
          border: '#e2e8f0',
          borderHover: '#cbd5e1',
          text: '#0f172a',
          muted: '#64748b',
          subtle: '#94a3b8',
          sidebar: '#ffffff',
          nav: '#ffffff',
        },
        severity: {
          critical: '#ef4444',
          high: '#f97316',
          medium: '#f59e0b',
          low: '#3b82f6',
          info: '#10b981',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(15, 23, 42, 0.03), 0 1px 2px -1px rgba(15, 23, 42, 0.03)',
        'card-hover': '0 10px 25px -5px rgba(15, 23, 42, 0.05), 0 8px 10px -6px rgba(15, 23, 42, 0.05)',
        'panel': '0 4px 20px -2px rgba(15, 23, 42, 0.05)',
        'dropdown': '0 10px 30px -5px rgba(15, 23, 42, 0.08), 0 4px 6px -2px rgba(15, 23, 42, 0.04)',
      }
    },
  },
  plugins: [],
}
