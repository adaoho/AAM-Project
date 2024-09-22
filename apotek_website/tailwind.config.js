/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  theme: {
    extend: {
      colors: {
        aam: {
          10: "#FE7560",
          20: "#0CCFA4",
          30: "#FFCC01",
          40: "#2B5A67",
          50: "#023A21",
          60: "#C7CEC5",
          70: "#755A38",
          80: "#B18159",
        },
      },
    },
    fontFamily: {
      lexendDeca: ["Lexend Deca"],
    },
  },
  daisyui: {
    logs: false,
    themeRoot: ":light",
  },
};
