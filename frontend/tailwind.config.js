/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black-primary': '#000000',
        'dark-bg': '#1a1a1a',
        'neon-red': '#ff0000',
        'red-accent': '#cc0000',
        'burgundy': '#8b0000',
        'red-light': '#ff3333',
      },
      boxShadow: {
        'red-glow': '0 0 20px rgba(255, 0, 0, 0.6)',
        'red-glow-intense': '0 0 50px rgba(255, 0, 0, 0.9)',
      },
    },
  },
  plugins: [],
}

