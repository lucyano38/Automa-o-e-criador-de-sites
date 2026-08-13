/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        amber: '#fabd00',
        neonPurple: '#5203d5',
        darkBg: '#121414',
      },
      backdropBlur: {
        sm: '4px',
        md: '12px',
        lg: '24px',
      },
    },
  },
  plugins: [],
};
