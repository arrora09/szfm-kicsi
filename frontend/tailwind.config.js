/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "rgb(40, 40, 40)",
        secondary: "rgb(25, 25, 25)",
        border: "rgba(70, 70, 70, 0.9)",
        light: "rgb(140, 140, 140)",
        green: "#38bb93",
        "green-hover": "rgba(56, 187, 147, 0.8)",
        red: "rgb(234, 60, 83)",
        "red-hover": "rgba(234, 60, 83, 0.9)",
        orange: "rgb(253, 103, 58)",
        "orange-hover": "rgba(253, 103, 58, 0.8)",
        blue: "rgb(48, 92, 166)",
        "blue-hover": "rgba(48, 92, 166, 0.8)",
        yellow: "rgb(255, 230, 0)",
        "yellow-hover": "rgba(255, 230, 0, 0.8)",
        pink: "rgb(255, 105, 180)",
        "pink-hover": "rgba(255, 105, 180, 0.8)",
      },
    },
  },
  plugins: [],
};
