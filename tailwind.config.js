/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#000000',
          grey: '#222222',
          mint: '#1DCD9F',
          deep: '#169976',
        },
        // Mapping for backward compatibility or semantic use
        primary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#1DCD9F', // Mint
          600: '#169976', // Deep
          700: '#134e4a',
          800: '#222222', // Dark Grey
          900: '#000000', // Black
          950: '#000000',
        }
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'premium': '0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 4px 10px -5px rgba(0, 0, 0, 0.04)',
        'premium-hover': '0 20px 40px -5px rgba(0, 0, 0, 0.12), 0 8px 15px -5px rgba(0, 0, 0, 0.06)',
      },
      screens: {
        'xs': '480px',
      }
    },
  },
  plugins: [],
}
