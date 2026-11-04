/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#2D4523',
          dark: '#1F3018',
          light: '#5E7153',
        },
        gold: {
          DEFAULT: '#D4B373',
          dark: '#B8924B',
          light: '#EAD7AE',
        },
        obsidian: '#0E1113',
        parchment: '#FAF8F5',
      },
      fontFamily: {
        'serif-display': ['"Cormorant Garamond"', 'Georgia', 'serif'],
        'serif-bible': ['Lora', 'Georgia', 'Cambria', 'serif'],
        'sans': ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}