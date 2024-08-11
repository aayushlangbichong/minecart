/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:{
          400:"#ff934f",

        },
        secondary:{
          400:"#5E565A"
        }
      }
    },
  },
  plugins: [],
}