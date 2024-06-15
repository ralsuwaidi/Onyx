// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        highlight: "rgb(219, 253, 173)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
