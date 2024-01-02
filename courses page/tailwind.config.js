/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./html/Courses.html", 
            "./html/Home.html"
],
  theme: {
    screens: {
      'sm': '300px',
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

