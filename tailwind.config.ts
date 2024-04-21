/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        expand: {
          '0%': { transform: 'scale(1)', 'transform-origin': 'center' },
          '100%': { transform: 'scale(1.2)', 'transform-origin': 'center' },
        },
      },
      animation: {
        expand: 'expand 0.1s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};
