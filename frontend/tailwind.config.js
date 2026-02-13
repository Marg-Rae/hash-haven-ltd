/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Earth tones with modern sophistication
        earth: {
          50: '#faf8f5',
          100: '#f3ede3',
          200: '#e7dac7',
          300: '#d6c0a1',
          400: '#c4a578',
          500: '#b08d5d',
          600: '#9a7549',
          700: '#7f5e3e',
          800: '#6a4f36',
          900: '#58422f',
        },
        sage: {
          50: '#f6f7f4',
          100: '#e3e8df',
          200: '#c7d2c0',
          300: '#a5b499',
          400: '#849574',
          500: '#687959',
          600: '#526145',
          700: '#424e38',
          800: '#37402f',
          900: '#2f3629',
        },
        terracotta: {
          50: '#fdf6f4',
          100: '#f9e8e4',
          200: '#f4d5cd',
          300: '#ebb9ab',
          400: '#df9279',
          500: '#d0764f',
          600: '#bc5d33',
          700: '#9f4927',
          800: '#843e23',
          900: '#6f3722',
        },
        sky: {
          50: '#f3f7f9',
          100: '#e0ecf1',
          200: '#c5dbe5',
          300: '#9dc3d3',
          400: '#6ea3ba',
          500: '#5088a3',
          600: '#416d89',
          700: '#375970',
          800: '#314c5e',
          900: '#2c4150',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Lora', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
