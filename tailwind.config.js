/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Silkscreen', 'cursive'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
    },
    // Breakpoints
    screens: {
      '-4xl': { max: '1920px' },
      // => @media (max-width: 1535px) { ... }

      '-3xl': { max: '1750px' },
      // => @media (max-width: 1535px) { ... }

      '-2xl': { max: '1512px' },
      // => @media (max-width: 1512px) { ... }

      '-1xl': { max: '1440px' },
      // => @media (max-width: 1440px) { ... }

      '-xl': { max: '1279px' },
      // => @media (max-width: 1279px) { ... }

      '-lg': { max: '1024px' },
      // => @media (max-width: 1023px) { ... }

      '-2md': { max: '834px' },
      // => @media (max-width: 834px) { ... }

      '-md': { max: '767px' },
      // => @media (max-width: 767px) { ... }

      '-sm': { max: '639px' },
      // => @media (max-width: 639px) { ... }

      '-xs': { max: '428px' }
      // => @media (max-width: 639px) { ... }
    }
  },
  plugins: [],
};
