import type { Config } from 'tailwindcss'
import scrollbarHide from 'tailwind-scrollbar-hide'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class', // Поддержка тем
  theme: {
    extend: {},
  },
  plugins: [scrollbarHide],
}

export default config
