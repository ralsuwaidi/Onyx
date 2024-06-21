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
        highlight: "var(--highlight-color)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
