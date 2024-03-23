/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#002A48',
      customBg:'rgb(247,219,167)',
      customButton:'#F2994A'
      },
     
    },
  },
  plugins: [],
}
