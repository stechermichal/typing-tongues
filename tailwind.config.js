/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
const { createThemes } = require('tw-colors')

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    // both usage of tw-colors plugin and overly restrictive/descriptive names are necessary due to there being more than 2 themes
    // TODO: what's the best way to apply themes inside the typing part? Should text-to-type be same color as main-color of the theme?
    createThemes({
      dark: {
        'bg-general': colors.gray[700], // main background
        'bg-component': colors.gray[800], // background for general components, like footer, header, etc
        'bg-button': colors.gray[600], // background for general components, like footer, header, etc
        'main-color': colors.blue[400], // main text color (not typed)
        'main-mute-color': colors.sky[300], // muted version of the color above
        'text-typed': colors.slate[50], // color of the text that has been typed
        'text-to-type': colors.slate[400], // color of the text that has to be typed
        'text-error': colors.red[300], // mistakes
        'text-highlight': colors.yellow[300], // letter that is currently being typed
      },
    }),
  ],
}
