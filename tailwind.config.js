/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.{html,js}"], 
  
  theme: {
    screens: {
      sm: '360px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        customBlue: '#14274f',
      },
      fontFamily: {
        'poiret':['Poiret One', 'sans-serif']
      }
    },
  },
  plugins: [],
}

