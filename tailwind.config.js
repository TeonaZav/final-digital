/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderColor: {
        DEFAULT: "rgba(229, 231, 235, 0.5)",
      },
    },
  },
  plugins: [],
});
