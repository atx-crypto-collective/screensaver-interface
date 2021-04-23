// https://tailwindcss.com/docs/theme
// const colors = require('tailwindcss/colors')

// https://smart-swatch.netlify.app/#303030 - gray (use gray.50 from figma)
// https://smart-swatch.netlify.app/#FF3434 - red

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  plugins: [
    // ...
    require('@tailwindcss/forms'),
  ],
  theme: {
    fontFamily: {
      mono: ['IBM Plex Mono', 'monospace'],
    },
    extend: {
      colors: {
        gray: {
          50: '#f9f9f9',
          100: '#d9d9d9',
          200: '#bfbfbf',
          300: '#a6a6a6',
          400: '#8c8c8c',
          500: '#737373',
          600: '#595959',
          700: '#404040',
          800: '#262626',
          900: '#120b0d',
        },
        red: {
          50: '#ffe2e2',
          100: '#ffb1b2',
          200: '#ff7f7f',
          300: '#ff4d4d',
          400: '#fe1d1b',
          500: '#e50501',
          600: '#b30000',
          700: '#810000',
          800: '#4f0000',
          900: '#200000',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
