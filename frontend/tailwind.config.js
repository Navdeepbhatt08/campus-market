/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        campus: {
          50: '#f0f5ff',
          100: '#e5edff',
          200: '#cddbfe',
          300: '#a4bcfd',
          400: '#7393fb',
          500: '#4f63f6',
          600: '#3942eb',
          700: '#2b2fd1',
          800: '#2629a9',
          900: '#252985',
          950: '#171852',
        },
        emeraldCampus: {
          50: '#ecfdf5',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'glow': '0 0 20px rgba(79, 99, 246, 0.35)',
      }
    },
  },
  plugins: [],
}
