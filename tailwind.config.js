/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f0ff2e',
        dark: '#0a0a0a',
      },
      fontFamily: {
        sans: ['var(--font-instrument-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
