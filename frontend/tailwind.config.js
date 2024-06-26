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
      "loading": "#a3a3a3",
      "transparent": colors.transparent,
      "star": "#ffc107",
      "text-gray": "#737373",
      "no-veggie": "#b9c1c",
      "like": "#dc2626",
      "black": colors.black,
      "h1-gray": "#5F5F5F",
      "button": "#DFDFDF",
      "semi-white": "#F8F8F8"
    }
  },
  plugins: [
    require('@headlessui/tailwindcss'),
  ],
}
