/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        pixel: ['Press Start 2P', 'monospace'],
      },
      colors: {
        ink: '#242033',
        cream: '#fff9ef',
        pink: '#f4a7bb',
        blue: '#9bd4f5',
        lavender: '#b9a7f5',
        mint: '#bfe6cf',
        coral: '#f26d57',
      },
      borderWidth: {
        3: '3px',
      },
    },
  },
  plugins: [],
}
