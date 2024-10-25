/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,html,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'black': '#000000',
      'white': '#FFFFFF',
      'master': '#F7CBCF',
      'accent': '#EA7681',
    },
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      gridTemplateColumns: {
        '50/50': '50% 50%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}



