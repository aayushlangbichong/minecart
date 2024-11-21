/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          900: "#b04502",
          600: "#fc7926",
          500: "#fc873d",
          400: "#ff934f",
          100: "#fabb93",
          50: "#ffe4d4",
        },
        secondary: {
          400: "#5E565A",
        },
      },
      screens: {
        "3xl": "1800px",
        "4xl": "2000px",
        "5xl": "2400px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
