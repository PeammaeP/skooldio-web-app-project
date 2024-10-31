/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customGray: "#222222",
        customYellow: '#DEF81C',
      },
    },
  },
  plugins: [],
};
