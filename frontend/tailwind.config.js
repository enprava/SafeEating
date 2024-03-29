/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      "bg": "#EFEFEF",
      "border": "#9D9D9D",
      "selected": "#D1D1D1",
      "white": colors.white,
      "green": "#16a34a",
    }
  },
  plugins: [],
}
