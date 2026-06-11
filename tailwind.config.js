/** @type {import('tailwindcss').Config} */
module.exports = {
  // Specify paths to all component files to scan for Tailwind classNames
  content: [
    "./App.js",
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}
