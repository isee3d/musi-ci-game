/** @type {import('tailwindcss').Config} */
const config = {
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        textGreen: '#00FF00',
      },
    },
  },
  plugins: [require("tailwindcss-debug-screens")],
};

module.exports = config;
