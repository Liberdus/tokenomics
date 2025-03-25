/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
 extend: {
      colors: {
        purple: {
          DEFAULT: '#3d3dce',
        },
        lightGrey: {
          DEFAULT: '#223b54',
        },
        darkGrey: {
          DEFAULT: '#333333',
        },
        cyan: {
          DEFAULT: '#faaf3f',
        },
        white: {
          DEFAULT: '#ffffff',
        },
      },
    },
  },
  plugins: [require('daisyui')],
}







