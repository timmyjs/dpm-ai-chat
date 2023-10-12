import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideDownAndFadeIn: {
          from: { opacity: "0", transform: "translateY(-2px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        typing: {
          "0%": {
            transform: "translateY(0px)",
            opacity: "0.7",
          },
          "28%": {
            transform: "translateY(-7px)",
            opacity: "0.4",
          },
          "44%": {
            transform: "translateY(0px)",
            opacity: "0.2",
          },
        },
      },
      animation: {
        fadeIn: "fadeIn 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideDownAndFadeIn:
          "slideDownAndFadeIn 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        typing: "typing 1.8s infinite ease-in-out",
      },
    },
  },
  plugins: [],
} satisfies Config;
