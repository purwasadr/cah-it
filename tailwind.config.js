const colors = require('tailwindcss/colors')
/** @type {import('tailwindcss').Config} */


module.exports = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif']
      },
      colors: {
        primary: colors.blue[500],
        'primary-dark': colors.blue[700],
        secondary: colors.blue[200],
      },
      textColor: {
        primary: colors.gray[700],
        secondary: colors.gray[500],
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp')
  ],
}
