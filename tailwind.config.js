/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'shimmer': 'shimmer 2s infinite',
      },
      // Adding a few Adora-Core tokens
      colors: {
        sanctuary: {
          purple: '#a855f7',
          pink: '#f472b6',
          blue: '#60a5fa'
        }
      }
    },
  },
  plugins: [],
}