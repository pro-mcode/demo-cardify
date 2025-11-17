/** @type {import('tailwindcss').Config} */
export default {
  content: ["./*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(278, 68%, 11%)",
        button: "#5E2B97",
        error: "hsl(0, 100%, 66%)",
      },
      fontFamily: {
        sans: ["Bricolage Grotesque", "sans-serif"],
        // adm: ["Playwrite CA", "cursive"],
      },
    },
  },
  safelist: [
    "[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,hsl(0,100%,66%),hsl(0,100%,66%))_border-box]",
  ],
  plugins: [],
};
