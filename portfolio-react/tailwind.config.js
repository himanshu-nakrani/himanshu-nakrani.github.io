/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    // Keep existing global reset and design tokens in index.css
    preflight: false,
  },
  theme: {
    extend: {},
  },
  plugins: [],
}
