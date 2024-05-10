/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
        game:["Press Start 2P","sans-serif"],
        free:["Freeman","sans-serif"],
      },
    extend: {
    },
  },
  plugins: [],
}