/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },

      colors: {
        primary: "#6499E9",
        secondary: "#2E4374",
        third: "#FFF5E0",
        fourth: "#F3B664",
        fifth: "#141E46",
        sixth: "#C70039",
        seventh: "#F1EB90",
      },
    },
  },
  plugins: [],
};
