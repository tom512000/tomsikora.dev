/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'dark-gray': '#0a0a0b',
        'middle-gray-1': '#0f0f10',
        'middle-gray-2': '#121113',
        'light-gray': '#232225',
        'light-green': '#9DE62F',
      },
      fontFamily: {
        lexend: ['Lexend', 'sans-serif'],
        dmsans: ['DM Sans', 'sans-serif'],
      },
      screens: {
        'ssm': '320px',
        'msm': '375px',
        'lsm': '425px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1600px',
      },
    },
  },
  variants: {},
  plugins: [],
}
