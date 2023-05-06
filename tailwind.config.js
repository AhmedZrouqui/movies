/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paperBlue: 'rgb(10,21,59)',
        paperRed: 'rgb(64,14,32)',
        offBlack: '#1d1d1d',
        white: 'rgba(255,255,255,.87)'
      }
    },
  },
  plugins: [],
}

