/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Source Serif 4"', 'serif'],
      },
      colors: {
        'perceive': {
          purple: '#3F1470',
          gold: '#FFA301',
        },
        dark: {
          primary: '#3F1470',    // Purple for primary elements
          accent: '#FFA301',     // Gold for accents
          bg: {
            primary: '#1a1a1a',  // Dark background
            secondary: '#2d2d2d' // Slightly lighter background
          },
          text: {
            primary: '#ffffff',   // White text
            secondary: '#cccccc', // Slightly dimmed text
            accent: '#FFA301'     // Gold for important text
          }
        }
      }
    },
  },
  plugins: [],
} 