const colors = {
  primary: '#1A4D8C', // 深蓝
  secondary: '#4A90E2', // 浅蓝
  accent: '#FF9900',   // 橙色
  background: '#FFFFFF', // 白色
  text: '#333333',     // 深灰
  highlight: '#E0F2F7', // 淡蓝色高亮
};

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: colors,
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
