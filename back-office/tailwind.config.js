/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '200px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
    // colors: {
    // primary: "#2F435E",
    // green: "#376F70",
    // orange: "#FB8C00",
    // red: "#F44336",
    // },
  },
  variants: {},
  plugins: [],
};
