/** @type {import('tailwindcss').Config} */
const config = {
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        textGreen: '#00FF00',
      },
      backgroundImage: {
        'my_bg_image' : "url('/images/piano_img.jpg')",
      }
    },
  },
  plugins: [require("tailwindcss-debug-screens")],
};

module.exports = config;
