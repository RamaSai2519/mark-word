/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        lightPurple: 'rgba(159, 127, 255, 1)',
        darkPurple: 'rgba(128, 85, 254, 1)',
        lightLavender: '#B5DDEA',
        darkLavender: '#B4B1E5',
        offWhite: 'rgba(255, 255, 255, 0.4)',
        primaryYellow: "#FFC629",
        lavender: "#B4B1E5",
        blue: "#B5DDEA",
        darkBlack: "#141414",
        lightBlack: "#212121",
        darkGray: "#393939",
        lightGray: "#B2B2B2",
        white: "#FFFFFF",
        bgColor: "#FAF0E5",
        orange: '#FFC629',
      },
    },
  },
  plugins: [],
}

