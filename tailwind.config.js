/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    "from-purple-400",
    "to-purple-600",
    "from-blue-400",
    "to-blue-600",
    "from-green-400",
    "to-green-600",
    "from-red-400",
    "to-red-600",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
