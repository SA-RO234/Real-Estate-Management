/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        sora: ["Sora","sans-serif"],
        chenla : [ "Chenla", "system-ui"],
        bokor : [ "Bokor", "system-ui"],
        moulpali : ["Moulpali", "sans-serif"],
        moul : ["Moul", "serif"]
      },
       colors:{
        orage: "#ED7D3A",
        blue : "#2F3D7E"
      }
    },
  },
  plugins: [require("daisyui")],
};
