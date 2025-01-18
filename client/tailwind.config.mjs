/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        menuColor: "#82ABA1",
      },
      fontFamily: {
        geologica: ['Geologica', 'serif'], // Add your font here
      },
    },
  },
  plugins: [],
};
