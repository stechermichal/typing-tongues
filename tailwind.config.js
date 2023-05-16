/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{html,ts}'],
  darkMode: false,
  content: [],
  theme: {
    extend: {
      colors: {
        background: colors.gray[900],
        backgroundSecondary: colors.gray[800],
        backgroundTertiary: colors.gray[700],
        primary: colors.green[500],
        secondary: colors.gray[600],
        tertiary: colors.blue[600],
        quaternary: colors.purple[600],
        accent: colors.purple[400],
        highlight: colors.blue[400],
        hover: colors.purple[300],
        error: colors.red[500],
        info: colors.cyan[400],
        warning: colors.yellow[400],
        success: colors.green[400],
        muted: colors.gray[500],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
