/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        zoom: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
        typing: {
          "from": { width: "0" },
          "to": { width: "100%" },
        },
        blink: {
          "50%": { borderColor: "transparent" },
        },
      },
      animation: {
        zoom: "zoom 3s ease-in-out infinite",
        typing: "typing 3s steps(20) forwards",
        blink: "blink 0.6s infinite",
      },
    },
  },
  plugins: [require("daisyui")],
};
