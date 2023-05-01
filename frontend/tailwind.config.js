/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'box-gradient':
          'linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 100%)',
        'bg-1': "url('/imgs/bg-1.png')",
        'bg-2': "url('/imgs/bg-2.png')",
        'bg-3': "url('/imgs/bg-3.png')",
        'bg-4': "url('/imgs/bg-4.png')"
      },
      colors: {
        'black': '#44474B',
        'lightgray': '#ACACAC',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require("tailwind-scrollbar-hide")
  ],
}

