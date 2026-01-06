/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{html,js}",
  ],
  theme: {
    extend: {
      cursor: {
        'custom': 'url(images/cursor-main.png), auto',
        'custom-hover': 'url(images/cursor-hover.png), pointer',
        'custom-active': 'url(images/cursor-special.png), pointer',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [],
}