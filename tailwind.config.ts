/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx,mdx}', './src/modules/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        disabled: {
          100: '#f2f2f2',
        },
        purple: {
          50: '#F5E1FF',
          100: '#D1B0FF',
          200: '#B280FF',
          300: '#8E4FFF',
          400: '#7A3AFF',
          500: '#6D2AFF',
          600: '#5F26E5',
          700: '#4C1FA7',
          800: '#391868',
          900: '#260E29',
        },
        orange: {
          50: '#FFF8F0',
          100: '#FEE1C7',
          200: '#FEC28F',
          300: '#FD9D51',
          400: '#FD7D21',
          500: '#FD6600',
          600: '#E65100',
          700: '#A54300',
          800: '#6E3300',
          900: '#3F1F00',
        },
        red: {
          50: '#FEE2E2',
          100: '#FECACA',
          200: '#FCA5A5',
          300: '#F87171',
          400: '#EF4444',
          500: '#DC2626',
          600: '#B91C1C',
          700: '#991B1B',
          800: '#7F1D1D',
          900: '#63171B',
        },
        black: '#000000',
        white: '#FFFFFF',
      },
    },
  },
  plugins: [],
};
export default config;
