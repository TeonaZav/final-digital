/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

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
