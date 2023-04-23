/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    fontFamily: {
      futura: ["Futura PT", "Futura", "sans-serif"],
      underground: ["p22-underground", "sans-serif"],
      "underground-petite-caps": ["p22-underground-pc", "sans-serif"],
      "underground-small-caps": ["p22-underground-sc", "sans-serif"],
      navigo: ["navigo", "sans-serif"],
    },
    extend: {
      colors: {
        wmata: {
          // https://www.wmata.com/business/procurement/solicitations/documents/Metro_Brand_and_Style_Guidelines.pdf
          rail: {
            red: "#bf0d3e",
            orange: "#ed8b00",
            blue: "#009cde",
            green: "#00b140",
            yellow: "#ffd100",
            silver: "#919d9d",
          },
        },
      },
    },
  },
  plugins: [],
};
