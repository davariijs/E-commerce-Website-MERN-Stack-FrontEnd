/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'primary': '#8A33FD',
      'secondary': '#F6F6F6',
      'darkText': '#3C4242',
      'grayText': '#807D7E',
      'black':'#000',
      'textCategory':'#2A2F2F',
      'textThinGray':'#7F7F7F',
      'yellow':'#FBD103',
      'borderGrey':'#BEBCBD'
    },
  },  
  plugins: ["tailwindcss ,autoprefixer"]
}

