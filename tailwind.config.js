/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',  // This includes all JavaScript and JSX files in the src directory
    './public/index.html'           // This includes the index.html file for Tailwind usage
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
