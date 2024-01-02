/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./html/Find_Tutors.html"],
  theme: {
    screens: {
      'sm': '360px',
      'md': '920px',
      'lg': '1000px',

    },

    extend: {
      colors: {
        custom: "#9F7878",
        customdark: "#714A4A",
      },
      fontFamily: {
        'poiret':['Poiret One', 'sans-serif']
      }
    },
  },
  plugins: [],
}


