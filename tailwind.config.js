/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        warm: '#FBF9F5',
        cream: '#F4EFE6',
        creamDark: '#EAE2D5',
        line: '#E5DDD0',
        ink: '#1D211E',
        muted: '#6E736A',
        terracotta: '#C85A32',
        terracottaDark: '#AC4823',
        templeGreen: '#2A4B3C',
        templeGreenDark: '#1E372B',
        gold: '#C89D52',
        goldLight: '#FDF7EB',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      }
    },
  },
  plugins: [],
}
