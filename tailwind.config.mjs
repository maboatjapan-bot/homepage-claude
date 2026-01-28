/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: '#00BFA5',
          'teal-dark': '#00A890',
          blue: '#3b82f6',
        },
        cta: {
          yellow: '#FFEB3B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans JP', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 60px rgba(0, 191, 165, 0.15)',
        'brand': '0 0 40px rgba(0, 191, 165, 0.25)',
      }
    },
  },
  plugins: [],
}
