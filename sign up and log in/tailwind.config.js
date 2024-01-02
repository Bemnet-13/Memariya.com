/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./html/instructors.html',
            './html/log-in.html',
            './html/students.html'],
  theme: {
    
    extend: {
      colors: {
        customBlue: '#14274f',
        customed: '#9F7878',
      },
      fontFamily: {
        'poiret':['Poiret One', 'sans-serif']
      }
    },
  },
  plugins: [],
}

