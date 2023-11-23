/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'navy': '#01144b',
        'btn-clr': '#ff2424'
      }
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
}

