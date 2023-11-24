/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        foreground: "#0e0101",
        background: "#ffffff",
        primary: "#D30000",
        secondary: "#EBADAD",
        accent: "#c60c0c",
        base: "#f4f4f5",
      },
    },
  },
};
