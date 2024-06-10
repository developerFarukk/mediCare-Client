/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8', // Example of hex color
        secondary: 'rgb(75, 85, 99)', // Example of rgb color
      },
    },
  },
  plugins: [
    require('daisyui'),
    require('flowbite/plugin')
  ]
}

