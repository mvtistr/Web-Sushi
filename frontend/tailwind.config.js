/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#333235',
        'neon-red': '#fa0000',
        'burgundy': '#833434',
        'primary': '#8b0606',
      },
      boxShadow: {
        'red-glow': '0 0 20px rgba(250, 0, 0, 0.5)',
        'red-glow-intense': '0 0 50px rgba(250, 0, 0, 0.8)',
      },
    },
  },
  plugins: [],
}

