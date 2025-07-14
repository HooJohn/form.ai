/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          DEFAULT: '#F97316', // Vibrant Orange
          'dark': '#EA580C',   // Darker orange for hover
        },
        'secondary': {
          DEFAULT: '#334155', // Sophisticated Slate Gray
          'dark': '#1E293B',  // Darker Slate for hover/gradients
        },
        'accent': {
          DEFAULT: '#F8FAFC', // Lighter, neutral gray-white background
        },
        'text-primary': '#1E293B', // Near-black for primary text
        'text-secondary': '#64748B', // Lighter gray for subtitles
        'accent-green': '#10B981', // Matte Green for highlights/success
        'accent-pink': '#EC4899', // Dusty Pink for special callouts
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
      },
      keyframes: {
        'fade-in-up': {
          'from': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
