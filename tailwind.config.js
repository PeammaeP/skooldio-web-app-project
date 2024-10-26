/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
          dtcs: "1440px",
          dtdf: "1920px",
    },
    extend: {},
  },
  plugins: [],
};
