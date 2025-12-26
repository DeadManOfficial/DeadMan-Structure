/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // AI Council Colors
        claude: '#FF8700',
        gemini: '#005F00',
        codex: '#00FFFF',
        // Dead Man Structure Dark Theme
        dms: {
          bg: '#0D0D0D',
          card: '#1A1A1A',
          border: '#2A2A2A',
          text: '#E5E5E5',
          muted: '#6B7280',
        }
      },
      fontFamily: {
        mono: ['"Fira Code"', 'monospace'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
