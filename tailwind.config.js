/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: false,
  },
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  important: '#root',
  theme: {
    theme: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: '#ffffff',
        background: '#27292D',
        receivedMessage: '#27292D',
        sentMessage: '#397BFE',
      },
    },
  },
  plugins: [],
};
