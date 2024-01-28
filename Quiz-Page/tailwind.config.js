/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./html/Quiz-Page.html"],
  theme: {
    extend: {
      screens: {
        sm: '360px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      colors: {
        custom: "#9F7878",
        customdark: "#714A4A",
        gray: "#D9D9D9"
      },
      fontFamily: {
        'Poppins': ['Poppins', 'sans- serif'],
      }
    }
  },
  plugins: [],
}

