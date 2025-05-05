/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "#003F42",
        "beige-clear-color": "#E4DFCE",
        "white-color": "#FAF9F6",
        "black-color": "#1C1C18",
        "gray-color":"#A9A9A9",
        "red-color":"#8B0000",
        "beige-color":"#F4F4ED",
        "black-coil":"#121212"
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [
  ],
}