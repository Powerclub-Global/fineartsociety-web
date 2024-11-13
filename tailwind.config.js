/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        ebg: ['EB Garamond', 'serif'], // EB Garamond
        cinzel: ['Cinzel', 'serif'],   // Cinzel
        geist: ['Geist Mono', 'monospace'], // Geist Mono
        gotham: ['Gotham', 'sans-serif'], // Geist Mono
      },
      colors: {
        gold: '#b4914b',
        black: '#000000',
        white: '#ffffff',
        gray: {
          400: "#b8b8b8",
        },
      },
    },
  },
  plugins: [],
};
